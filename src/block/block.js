/**
 * BLOCK: demo-talk
 *
 * Registering a basic block with Gutenberg.
 * Simple block, renders and saves the same content without any interactivity.
 */

//  Import CSS.
import './style.scss';
import './editor.scss';

const { __ } = wp.i18n;
const { registerBlockType } = wp.blocks;
const { InspectorControls, BlockControls } = wp.editor;
const { Fragment } = wp.element;
const { PanelBody, Toolbar, Button } = wp.components;

/**
 * Register: aa Gutenberg Block.
 *
 * Registers a new block provided a unique name and an object defining its
 * behavior. Once registered, the block is made editor as an option to any
 * editor interface where blocks are implemented.
 *
 * @link https://wordpress.org/gutenberg/handbook/block-api/
 */
registerBlockType( 'demo-talk/block-1', {
	// Block name. Block names must be string that contains a namespace prefix. Example: my-plugin/my-custom-block.
	title   : __( 'Demo Block 1' ), // Block title.
	icon    : 'shield', // Block icon from Dashicons → https://developer.wordpress.org/resource/dashicons/.
	category: 'common', // Block category — Group blocks together based on common traits E.g. common, formatting, layout widgets, embed.
	keywords: [],

	attributes: {
		expanded: {
			type   : 'boolean',
			default: true,
		}
	},

	/**
	 * The edit function describes the structure of your block in the context of the editor.
	 * This represents what the editor will render when the block is used.
	 *
	 * The "edit" property must be a valid function.
	 *
	 * @link https://wordpress.org/gutenberg/handbook/block-api/block-edit-save/
	 */
	edit( { className, attributes, setAttributes, isSelected } ) {

		const toggleExpand = () => setAttributes( { expanded: !attributes.expanded } );

		return (
			<Fragment>
				<BlockControls>
					<Toolbar controls={[{ icon: attributes.expanded ? 'editor-contract' : 'editor-expand', title: 'Expand', onClick: toggleExpand }]}/>
				</BlockControls>
				<InspectorControls>
					<PanelBody>
						<Button isLarge onClick={toggleExpand}>{attributes.expanded ? 'Contract' : 'Expand'}</Button>
					</PanelBody>
				</InspectorControls>
				<div className={className}>
					<p>This is some test content.</p>
					{attributes.expanded && <p>Expanded!</p>}
				</div>
			</Fragment>
		);
	},

	/**
	 * The save function defines the way in which the different attributes should be combined
	 * into the final markup, which is then serialized by Gutenberg into post_content.
	 *
	 * The "save" property must be specified and must be a valid function.
	 *
	 * @link https://wordpress.org/gutenberg/handbook/block-api/block-edit-save/
	 */
	save( { className, attributes } ) {
		return (
			<div className={className}>
				<p>This is some test content.</p>
				{attributes.expanded && <p>Expanded!</p>}
			</div>
		);
	},
} );
