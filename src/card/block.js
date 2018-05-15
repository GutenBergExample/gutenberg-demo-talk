import './style.scss';
import './editor.scss';
import classnames from 'classnames';

const { __ } = wp.i18n;
const { registerBlockType } = wp.blocks;
const { Fragment } = wp.element;
const { ImagePlaceholder, BlockControls, MediaUpload, RichText, UrlInput, BlockAlignmentToolbar, InnerBlocks, InspectorControls } = wp.editor;
const { IconButton, Toolbar, Dashicon, PanelBody, ColorPalette } = wp.components;
const { isEmpty } = lodash;

const clPrefix = 'wp-block-demo-talk-card-';

registerBlockType( 'demo-talk/card', {
	title     : __( 'Card' ),
	category  : 'layout',
	attributes: {
		src     : {
			type     : 'string',
			source   : 'attribute',
			selector : 'img',
			attribute: 'src',
		},
		width   : {
			type     : 'number',
			source   : 'attribute',
			selector : 'img',
			attribute: 'width',
		},
		mediaId : {
			type: 'number',
		},
		title   : {
			type    : 'array',
			source  : 'children',
			selector: `.${clPrefix}title`,
		},
		text    : {
			type    : 'array',
			source  : 'children',
			selector: `.${clPrefix}text`,
		},
		ctaHref : {
			type     : 'string',
			source   : 'attribute',
			selector : '.btn',
			attribute: 'href',
		},
		ctaLabel: {
			type    : 'array',
			source  : 'children',
			selector: '.btn span',
		},
		align   : {
			type: 'string',
		},
		color   : {
			type: 'string',
		}
	},
	edit( { className, attributes, setAttributes, isSelected } ) {
		const onSelectImage = image => {
			if ( image ) {
				setAttributes( { mediaId: image.id, src: image.sizes.full.url, width: image.sizes.full.width } );
			} else {
				setAttributes( { mediaId: 0, src: '', width: 0 } );
			}
		};

		const { src, width, mediaId, title, text, ctaHref, ctaLabel, align, color = 'primary' } = attributes;

		let isFresh = false;

		if ( isEmpty( attributes ) ) {
			isFresh = true;
		} else {
			const keys = Object.keys( attributes );

			if ( keys.length === 1 && attributes.hasOwnProperty( 'layout' ) && typeof attributes.layout === 'undefined' ) {
				isFresh = true;
			}
		}

		return (
			<Fragment>
				<BlockControls>
					<Toolbar>
						<BlockAlignmentToolbar value={align} onChange={align => setAttributes( { align } )}/>

						{src && src.length > 0 && (
							<Fragment>
								<MediaUpload onSelect={onSelectImage} type="image" value={mediaId} render={( { open } ) => (<IconButton
									label={__( 'Edit Image' )} icon="edit" onClick={open}
									className={`components-toolbar__control wp-block-demo-talk-card__toolbar-media-upload`}
								/>)}/>
								<IconButton icon='no-alt' className='components-toolbar__control' label={__( 'Remove Image' )} onClick={e => {
									e.stopPropagation();
									onSelectImage();
								}}/>
							</Fragment>
						)}
					</Toolbar>
				</BlockControls>
				<InspectorControls>
					<PanelBody>
						<ColorPalette colors={themeColors()} disableCustomColors={true} value={getColorHexFromClassName( color )}
									  onChange={color => setAttributes( { color: getColorClassNameFromHex( color ) } )}/>
					</PanelBody>
				</InspectorControls>
				<div className={classnames( className, { 'text-center': align === 'center', 'text-right': align === 'right' } )}>
					{src && src.length > 0 ?
						<img className={`${clPrefix}img-top`} src={src} width={width}/> :
						(isFresh || isSelected) && <ImagePlaceholder className={`${clPrefix}img-top`} label={__( 'Image' )} onSelectImage={onSelectImage} icon="format-image"/>
					}
					<div className={`${clPrefix}body`}>
						<RichText tagName="h3" className={`${clPrefix}title`} value={title} onChange={title => setAttributes( { title } )} placeholder={plTitle}/>
						{((text && text.length > 0) || isSelected) && (
							<RichText tagName="p" className={`${clPrefix}text`} value={text} onChange={text => setAttributes( { text } )} placeholder={plText}/>
						)}
						{((ctaLabel && ctaLabel.length > 0) || isSelected) && (
							<div className="wp-block-demo-talk-card__button-container">
								<span className={`btn btn-${color} btn-large`}>
									<RichText tagName="span" value={ctaLabel} onChange={ctaLabel => setAttributes( { ctaLabel } )} placeholder={plCtaLabel}
											  formattingControls={[]}
											  keepPlaceholderOnFocus/>
								</span>
								{isSelected && (
									<form className="wp-block-demo-talk-card__inline-link" onSubmit={e => e.preventDefault()}>
										<Dashicon icon="admin-links"/>
										<UrlInput value={ctaHref} onChange={ctaHref => setAttributes( { ctaHref } )} autoFocus={false}/>
										<IconButton icon="editor-break" label={__( 'Apply' )} type="submit"/>
									</form>
								)}
							</div>
						)}
					</div>
				</div>
			</Fragment>
		)
	},
	save( { className, attributes } ) {

		const { src, width, title, text, ctaHref, ctaLabel, align, color = 'primary' } = attributes;

		return (
			<div className={classnames( className, { 'text-center': align === 'center', 'text-right': align === 'right' } )}>
				{src && src.length > 0 && <img className={`${clPrefix}img-top`} src={src} width={width}/>}
				<div className={`${clPrefix}body`}>
					<RichText.Content tagName="h3" className={`${clPrefix}title`} value={title}/>
					{text && text.length > 0 && <RichText.Content tagName="p" className={`${clPrefix}text`} value={text}/>}
					{((ctaLabel && ctaLabel.length > 0)) && (
						<a href={ctaHref} className={`btn btn-${color} btn-large`}>
							<RichText.Content tagName="span" value={ctaLabel}/>
						</a>
					)}
				</div>
			</div>
		)
	}
} );

const plTitle = __( 'Card title' );
const plText = __( 'Some quick example text to build on the card title and make up the bulk of the card\'s content.' );
const plCtaLabel = __( 'Go somewhere' );

registerBlockType( 'demo-talk/card-columns', {
	title: __( 'Card Columns' ),

	icon: 'columns',

	category: 'layout',

	description: __( 'Add a block that displays cards in multiple columns.' ),

	edit() {

		return (
			<Fragment>
				<div className={`${clPrefix}columns-editor`}>
					<InnerBlocks allowedBlocks={['demo-talk/card']}/>
				</div>
			</Fragment>
		);
	},
	save( { className } ) {
		return (
			<div className={className}>
				<InnerBlocks.Content/>
			</div>
		);
	},
} );

function themeColors() {
	return [
		{ color: '#007bff', name: __( 'Primary' ), className: 'primary' },
		{ color: '#6c757d', name: __( 'Secondary' ), className: 'secondary' },
		{ color: '#28a745', name: __( 'Success' ), className: 'success' },
		{ color: '#17a2b8', name: __( 'Info' ), className: 'info' },
		{ color: '#ffc107', name: __( 'Warning' ), className: 'warning' },
		{ color: '#c82333', name: __( 'Danger' ), className: 'danger' },
		{ color: '#f8f9fa', name: __( 'Light' ), className: 'light' },
		{ color: '#343a40', name: __( 'Dark' ), className: 'dark' },
	]
}

function getColorClassNameFromHex( hex ) {

	for ( const color of themeColors() ) {
		if ( color.color === hex ) {
			return color.className;
		}
	}

	return null;
}

function getColorHexFromClassName( className ) {

	for ( const color of themeColors() ) {
		if ( color.className === className ) {
			return color.color;
		}
	}

	return null;
}