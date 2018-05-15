import './style.scss';
import './editor.scss';

const { __ } = wp.i18n;

const { registerBlockType } = wp.blocks;
const { RichText } = wp.editor;
const { Dashicon, IconButton } = wp.components;
const { UrlInput } = wp.editor;

registerBlockType( 'demo-talk/jumbotron', {
	title     : __( 'Jumbotron' ),
	icon      : 'slides',
	category  : 'layout',
	attributes: {
		headline: {
			type    : 'array',
			source  : 'children',
			selector: 'h1',
		},
		lead    : {
			type    : 'array',
			source  : 'children',
			selector: 'p.lead',
		},
		text    : {
			type    : 'array',
			source  : 'children',
			selector: '.jumbotron .text',
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
	},
	edit( { className, attributes, setAttributes, isSelected } ) {
		return (
			<div className={className}>
				<div className="jumbotron">
					<RichText tagName="h1" className="display-4" value={attributes.headline} onChange={headline => setAttributes( { headline } )} placeholder={plHeadline} formattingControls={[]}/>
					{((attributes.lead && attributes.lead.length > 0) || isSelected) && (
						<RichText tagName="p" className="lead" value={attributes.lead} onChange={lead => setAttributes( { lead } )} placeholder={plLead}/>
					)}
					{((attributes.text && attributes.text.length > 0) || (attributes.ctaLabel && attributes.ctaLabel.length > 0) || isSelected) && <hr className="my-4"/>}
					{((attributes.text && attributes.text.length > 0) || isSelected) && (
						<RichText tagName="div" className="text" multiline="p" value={attributes.text} onChange={text => setAttributes( { text } )} placeholder={plText}/>
					)}
					{((attributes.ctaLabel && attributes.ctaLabel.length > 0) || isSelected) && (
						<div className="wp-block-demo-talk-jumbotron__button-container">
							<span className="btn btn-primary btn-large">
								<RichText tagName="span" value={attributes.ctaLabel} onChange={ctaLabel => setAttributes( { ctaLabel } )} placeholder={plButton} formattingControls={[]}
										  keepPlaceholderOnFocus/>
							</span>
							{isSelected && (
								<form className="wp-block-demo-talk-jumbotron__inline-link" onSubmit={e => e.preventDefault()}>
									<Dashicon icon="admin-links"/>
									<UrlInput value={attributes.ctaHref} onChange={ctaHref => setAttributes( { ctaHref } )} autoFocus={false}/>
									<IconButton icon="editor-break" label={__( 'Apply' )} type="submit"/>
								</form>
							)}
						</div>
					)}
				</div>
			</div>
		)
	},
	save( { className, attributes } ) {
		const { headline, lead, text, ctaHref, ctaLabel } = attributes;

		return (
			<div className={className}>
				<div className="jumbotron">
					<RichText.Content tagName="h1" className="display-4" value={headline}/>
					{lead && lead.length > 0 && <RichText.Content tagName="p" className="lead" value={lead}/>}
					{((text && text.length > 0) || (ctaLabel && ctaLabel.length > 0)) && <hr className="my-4"/>}
					{text && text.length > 0 && <RichText.Content tagName="div" className="text" value={text}/>}
					{((ctaLabel && ctaLabel.length > 0)) && (
						<a href={ctaHref} className="btn btn-primary btn-large">
							<RichText.Content tagName="span" value={ctaLabel}/>
						</a>
					)}
				</div>
			</div>
		)
	}
} );

const plHeadline = __( 'Hello, world!' );
const plLead = __( 'This is a simple hero unit, a simple jumbotron-style component for calling extra attention to featured content or information.' );
const plText = __( 'It uses utility classes for typography and spacing to space content out within the larger container.' );
const plButton = __( 'Learn more' );

const save = ( { className, attributes } ) => {
	const { headline, lead, text, ctaHref, ctaLabel } = attributes;

	return (
		<div className={className}>
			<div className="jumbotron">
				<RichText.Content tagName="h1" className="display-4" value={headline}/>
				{lead && lead.length > 0 && <RichText.Content tagName="p" className="lead" value={lead}/>}
				{((text && text.length > 0) || (ctaLabel && ctaLabel.length > 0)) && <hr className="my-4"/>}
				{text && text.length > 0 && <RichText.Content tagName="div" className="text" value={text}/>}
				{((ctaLabel && ctaLabel.length > 0)) && (
					<a href={ctaHref} className="btn btn-primary btn-large">
						<RichText.Content tagName="span" value={ctaLabel}/>
					</a>
				)}
			</div>
		</div>
	)
};