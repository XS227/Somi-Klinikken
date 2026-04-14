<?php

declare(strict_types=1);
session_start();
require_once __DIR__ . '/includes/content.php';

if (!admin_is_logged_in()) {
    header('Location: /admin.php');
    exit;
}

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    header('Location: /admin.php');
    exit;
}

$content = load_site_content();
$homePost = $_POST['home'] ?? [];

$fields = [
    'hero_kicker',
    'hero_title',
    'hero_text',
    'hero_primary_label',
    'hero_primary_url',
    'hero_secondary_label',
    'hero_secondary_url',
    'hero_image',
    'about_title',
    'about_text_1',
    'about_text_2',
    'about_image',
];

foreach ($fields as $field) {
    $content['home'][$field] = trim((string)($homePost[$field] ?? ''));
}

function handle_upload(string $name): ?string
{
    if (!isset($_FILES[$name]) || !is_array($_FILES[$name])) {
        return null;
    }

    $file = $_FILES[$name];
    if (($file['error'] ?? UPLOAD_ERR_NO_FILE) === UPLOAD_ERR_NO_FILE) {
        return null;
    }

    if (($file['error'] ?? UPLOAD_ERR_NO_FILE) !== UPLOAD_ERR_OK) {
        return null;
    }

    $tmpPath = (string)($file['tmp_name'] ?? '');
    $original = (string)($file['name'] ?? '');
    $extension = strtolower(pathinfo($original, PATHINFO_EXTENSION));
    $allowed = ['jpg', 'jpeg', 'png', 'webp', 'gif', 'svg'];

    if (!in_array($extension, $allowed, true)) {
        return null;
    }

    $uploadDir = __DIR__ . '/uploads';
    if (!is_dir($uploadDir)) {
        mkdir($uploadDir, 0775, true);
    }

    $filename = sprintf('%s-%s.%s', $name, bin2hex(random_bytes(6)), $extension);
    $target = $uploadDir . '/' . $filename;

    if (!move_uploaded_file($tmpPath, $target)) {
        return null;
    }

    return '/uploads/' . $filename;
}

$heroUpload = handle_upload('hero_image_upload');
if ($heroUpload !== null) {
    $content['home']['hero_image'] = $heroUpload;
}

$aboutUpload = handle_upload('about_image_upload');
if ($aboutUpload !== null) {
    $content['home']['about_image'] = $aboutUpload;
}

if (save_site_content($content)) {
    $_SESSION['admin_flash'] = 'Innhold lagret.';
} else {
    $_SESSION['admin_flash'] = 'Kunne ikke lagre innhold.';
}

header('Location: /admin.php');
exit;
