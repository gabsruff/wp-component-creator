<?php
/**
 * Plugin Name: <%= componentName %>
 * Description: <%= componentDescription %>
 * Version: 1.0.0
 * Author: <%= author %>
 */

if ( ! defined( 'ABSPATH' ) ) exit;

// Registrar scripts generados por Vite
function <%= slug %>_enqueue_scripts() {
    $plugin_url = plugin_dir_url( __FILE__ );
    wp_enqueue_script(
        '<%= slug %>-script',
        $plugin_url . 'assets/index.js',
        array(),
        '1.0.0',
        true
    );
}
add_action( 'wp_enqueue_scripts', '<%= slug %>_enqueue_scripts' );

// Shortcode para renderizar el componente
function component_shortcode() {
    return '<div id="<%= slug %>"></div>';
}
add_shortcode( '<%= slug %>', '<%= slug %>_shortcode' );
