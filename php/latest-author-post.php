<?php

add_action( 'init', function () {
	register_block_type( 'demo-talk/latest-author-post', [
		'render_callback' => function( $attributes ) {
			$attributes = wp_parse_args( $attributes, [
				'headline' => __( 'Latest from the author' ),
				'readMore' => __( 'Read more' ),
			] );

			$author = get_the_author_meta( 'id' );

			if ( ! $posts = get_posts( [
				'author'         => $author,
				'exclude'        => [ get_the_ID() ],
				'posts_per_page' => 1,
			] ) ) {
				return '';
			}

			ob_start();
			?>

			<div class="wp-block-demo-talk-latest-author-post">
				<h3><?php echo $attributes['headline']; ?></h3>
				<div class="wp-block-demo-talk-latest-author-post__container">
					<figure class="wp-block-demo-talk-latest-author-post__author">
						<img src=<?php echo esc_attr( get_avatar_url( $author ) ); ?>/>
						<figcaption><?php the_author(); ?></figcaption>
					</figure>
					<?php setup_postdata( $posts[0] ); ?>
					<div class="wp-block-demo-talk-latest-author-post__post">
						<h4><?php the_title(); ?></h4>
						<div class="wp-block-demo-talk-latest-author-post__excerpt"><?php the_excerpt(); ?></div>
						<p class="wp-block-demo-talk-latest-author-post__read-more">
							<a href="<?php the_permalink() ?>"><?php echo $attributes['readMore']; ?></a>
						</p>
					</div>
					<?php wp_reset_postdata(); ?>
				</div>
			</div>

			<?php
			return ob_get_clean();
		}
	] );
} );

