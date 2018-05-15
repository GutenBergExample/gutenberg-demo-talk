import './style.scss';
import './editor.scss';

const { __ } = wp.i18n;
const { registerBlockType } = wp.blocks;
const { Fragment, RawHTML } = wp.element;
const { InspectorControls, RichText } = wp.editor;
const { PanelBody, SelectControl } = wp.components;
const $ = jQuery;

registerBlockType( 'demo-talk/alert', {
	title     : __( 'Alert' ),
	icon      : 'megaphone',
	category  : 'common',
	keywords  : [],
	attributes: {
		severity: {
			type   : 'string',
			default: 'warning',
		},
		content : {
			type    : 'string',
			source  : 'html',
			selector: 'div',
		}
	},

	edit( { className, attributes, setAttributes } ) {
		return (
			<Fragment>
				<InspectorControls>
					<PanelBody>
						<SelectControl label={__( 'Severity' )} value={attributes.severity} onChange={severity => setAttributes( { severity } )} options={getSeverities()}/>
					</PanelBody>
				</InspectorControls>
				<div className={`${className} wp-block-demo-talk-alert-${attributes.severity}`} role="alert">
					<RichText value={attributes.content} format="string" onChange={content => setAttributes( { content: mutateContent( content ) } )} placeholder={__( 'Type your notice...' )}/>
				</div>
			</Fragment>
		);
	},
	save( { className, attributes } ) {
		return (
			<div className={`${className || ''} wp-block-demo-talk-alert-${attributes.severity}`} role="alert"><RawHTML>{attributes.content}</RawHTML></div>
		)
	}
} );

function getSeverities() {
	return [
		{ value: 'primary', label: __( 'Primary' ) },
		{ value: 'secondary', label: __( 'Secondary' ) },
		{ value: 'success', label: __( 'Success' ) },
		{ value: 'info', label: __( 'Info' ) },
		{ value: 'warning', label: __( 'Warning' ) },
		{ value: 'danger', label: __( 'Danger' ) },
		{ value: 'light', label: __( 'Light' ) },
		{ value: 'dark', label: __( 'Dark' ) },
	];
}

function mutateContent( content ) {

	const $el = $( `<div>${content}</div>` );
	$( 'a', $el ).addClass( 'alert-link' );

	return $el.html();
}