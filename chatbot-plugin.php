<?php
/**
 * Plugin Name: カスタムチャットボット
 * Plugin URI: https://yourwebsite.com
 * Description: 企業サイト向けカスタマイズ可能なチャットボット
 * Version: 1.0.0
 * Author: あなたの名前
 * Text Domain: custom-chatbot
 */

// 直接アクセス禁止
if (!defined('ABSPATH')) {
    exit;
}

// プラグインのパスとURLを定義
define('CHATBOT_PLUGIN_PATH', plugin_dir_path(__FILE__));
define('CHATBOT_PLUGIN_URL', plugin_dir_url(__FILE__));

// チャットボットのスクリプトを登録
function chatbot_enqueue_scripts() {
    wp_enqueue_script('chatbot-js', CHATBOT_PLUGIN_URL . 'js/chatbot.js', array(), '1.0.0', true);
}
add_action('wp_enqueue_scripts', 'chatbot_enqueue_scripts');

// 管理画面メニューを追加
function chatbot_admin_menu() {
    add_menu_page(
        'チャットボット設定',
        'チャットボット',
        'manage_options',
        'chatbot-settings',
        'chatbot_settings_page',
        'dashicons-format-chat',
        30
    );
}
add_action('admin_menu', 'chatbot_admin_menu');

// 設定ページの表示
function chatbot_settings_page() {
    ?>
    <div class="wrap">
        <h1>チャットボット設定</h1>
        <p>このプラグインはサイトにチャットボットを追加します。</p>
        <p>現在の設定では、チャットボットはすべてのページに自動的に表示されます。</p>
        <p>将来のバージョンでは、ここでチャットボットの設定をカスタマイズできるようになります。</p>
    </div>
    <?php
}

// プラグイン有効化時の処理
register_activation_hook(__FILE__, 'chatbot_activate');
function chatbot_activate() {
    // 将来的に初期設定などが必要な場合はここに記述
}

// プラグイン無効化時の処理
register_deactivation_hook(__FILE__, 'chatbot_deactivate');
function chatbot_deactivate() {
    // 将来的にクリーンアップが必要な場合はここに記述
}
