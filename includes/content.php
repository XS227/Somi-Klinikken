<?php

declare(strict_types=1);

function content_file_path(): string
{
    return dirname(__DIR__) . '/data/content.json';
}

function load_site_content(): array
{
    $path = content_file_path();

    if (!is_file($path)) {
        return [];
    }

    $raw = file_get_contents($path);
    if ($raw === false) {
        return [];
    }

    $data = json_decode($raw, true);

    return is_array($data) ? $data : [];
}

function save_site_content(array $content): bool
{
    $path = content_file_path();
    $json = json_encode(
        $content,
        JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES
    );

    if ($json === false) {
        return false;
    }

    return file_put_contents($path, $json . PHP_EOL, LOCK_EX) !== false;
}

function e(string $value): string
{
    return htmlspecialchars($value, ENT_QUOTES | ENT_SUBSTITUTE, 'UTF-8');
}

function content_get(array $data, string $section, string $key, string $default = ''): string
{
    return (string)($data[$section][$key] ?? $default);
}

function admin_is_logged_in(): bool
{
    return !empty($_SESSION['admin_logged_in']);
}
