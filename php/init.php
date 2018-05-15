<?php
/**
 * Blocks Initializer
 *
 * Enqueue CSS/JS of all the blocks.
 *
 * @since    1.0.0
 * @package  CGB
 */

require_once __DIR__ . '/latest-author-post.php';

/**
 * Enqueue Gutenberg block assets for both frontend + backend.
 *
 * `wp-blocks`: includes block type registration and related functions.
 *
 * @since 1.0.0
 */
function demo_talk_cgb_block_assets() {
	wp_enqueue_style(
	// Handle.
		'demo_talk-cgb-style-css',
		// Block style CSS.
		plugins_url( 'dist/blocks.style.build.css', __DIR__ ),
		[],
		// Version
		filemtime( __DIR__ . '/../dist/blocks.style.build.css' )
	);
}

add_action( 'enqueue_block_assets', 'demo_talk_cgb_block_assets' );

/**
 * Enqueue Gutenberg block assets for backend editor.
 *
 * `wp-blocks`: includes block type registration and related functions.
 * `wp-element`: includes the WordPress Element abstraction for describing the structure of your blocks.
 * `wp-i18n`: To internationalize the block's text.
 *
 * @since 1.0.0
 */
function demo_talk_cgb_editor_assets() {
	wp_enqueue_script(
		'demo_talk-cgb-block-js',
		// Block.build.js: We register the block here. Built with Webpack.
		plugins_url( '/dist/blocks.build.js', __DIR__ ),
		[],
		filemtime( __DIR__ . '/../dist/blocks.build.js' )
	);

	wp_enqueue_style(
		'demo_talk-cgb-block-editor-css',
		plugins_url( 'dist/blocks.editor.build.css', __DIR__ ),
		[],
		filemtime( __DIR__ . '/../dist/blocks.editor.build.css' )
	);
}

add_action( 'enqueue_block_editor_assets', 'demo_talk_cgb_editor_assets' );