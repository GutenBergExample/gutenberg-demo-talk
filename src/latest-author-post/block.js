import './style.scss';
import './editor.scss';

const { __ } = wp.i18n;
const { registerBlockType } = wp.blocks;
const { Fragment, compose, RawHTML } = wp.element;
const { RichText } = wp.editor;
const { withAPIData, Spinner } = wp.components;
const { withSelect } = wp.data;

registerBlockType( 'demo-talk/latest-author-post', {
	title     : __( 'Latest Author Post' ),
	icon      : 'id',
	category  : 'widgets',
	supports  : {
		html: false,
	},
	attributes: {
		headline: {
			type   : 'string',
			default: __( 'Latest from the Author' )
		},
		readMore: {
			type   : 'string',
			default: __( 'Read more' ),
		}
	},

	edit: compose( [
		withSelect( select => ({
			author: select( 'core/editor' ).getEditedPostAttribute( 'author' ),
			postId: select( 'core/editor' ).getEditedPostAttribute( 'id' ),
		}) ),
		withAPIData( ( { author, postId } ) => ({
			user      : `/wp/v2/users/${author}`,
			latestPost: `/wp/v2/posts?author=${author}&exclude=${postId}&per_page=1&orderby=date&order=desc`
		}) ),
	] )( ( { className, user, latestPost, attributes, setAttributes } ) => {
		return (
			<div className={className}>
				<RichText tagName="h3" value={attributes.headline} format="string" onChange={headline => setAttributes( { headline } )} placeholder={__( 'Latest from the Author' )}/>
				{user.isLoading || latestPost.isLoading ?
					<div>
						<Spinner/>
						{__( 'Loading...' )}
					</div>
					: (<div className="wp-block-demo-talk-latest-author-post__container">
							<figure className="wp-block-demo-talk-latest-author-post__author">
								{user.data && <img src={user.data.avatar_urls[96]}/>}
								{user.data && <figcaption>{user.data.name}</figcaption>}
							</figure>
							<div className="wp-block-demo-talk-latest-author-post__post">
								{latestPost.data && (
									<Fragment>
										<h4>{latestPost.data[0].title.rendered}</h4>
										<RawHTML className="wp-block-demo-talk-latest-author-post__excerpt">{latestPost.data[0].excerpt.rendered}</RawHTML>
										<div className="wp-block-demo-talk-latest-author-post__read-more">
											<RichText tagName="a" href={latestPost.data[0].link} value={attributes.readMore} format="string" onChange={readMore => setAttributes( { readMore } )}
													  placeholder={__( 'Read more' )}/>
										</div>
									</Fragment>
								)}
							</div>
						</div>
					)}
			</div>
		);
	} ),
	save() {
		return null;
	}
} );