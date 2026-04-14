<?php

declare(strict_types=1);
session_start();
require_once __DIR__ . '/includes/content.php';

$adminUser = getenv('ADMIN_USER') ?: 'admin';
$adminPass = getenv('ADMIN_PASS') ?: 'somi123';
$error = '';

if ($_SERVER['REQUEST_METHOD'] === 'POST' && isset($_POST['login'])) {
    $username = trim((string)($_POST['username'] ?? ''));
    $password = (string)($_POST['password'] ?? '');

    if (hash_equals($adminUser, $username) && hash_equals($adminPass, $password)) {
        $_SESSION['admin_logged_in'] = true;
        header('Location: /admin.php');
        exit;
    }

    $error = 'Feil brukernavn eller passord.';
}

if ($_SERVER['REQUEST_METHOD'] === 'POST' && isset($_POST['logout'])) {
    session_destroy();
    header('Location: /admin.php');
    exit;
}

$content = load_site_content();
$home = $content['home'] ?? [];
$flash = $_SESSION['admin_flash'] ?? null;
unset($_SESSION['admin_flash']);
?>
<!doctype html>
<html lang="no">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <title>Mini admin | SOMI</title>
  <link rel="stylesheet" href="/css/admin.css" />
</head>
<body>
  <main class="admin-wrap">
    <header class="admin-head">
      <h1>Mini Admin</h1>
      <p>Ingen database. Data lagres i <code>data/content.json</code>.</p>
    </header>

    <?php if (!admin_is_logged_in()): ?>
      <section class="card">
        <h2>Logg inn</h2>
        <?php if ($error !== ''): ?><p class="error"><?= e($error) ?></p><?php endif; ?>
        <form method="post" autocomplete="off">
          <label>Brukernavn
            <input type="text" name="username" required />
          </label>
          <label>Passord
            <input type="password" name="password" required />
          </label>
          <button type="submit" name="login" value="1">Logg inn</button>
        </form>
      </section>
    <?php else: ?>
      <section class="card">
        <div class="card-row">
          <h2>Forsideinnhold</h2>
          <form method="post"><button class="ghost" type="submit" name="logout" value="1">Logg ut</button></form>
        </div>

        <?php if ($flash): ?><p class="ok"><?= e((string)$flash) ?></p><?php endif; ?>

        <form method="post" action="/save.php" enctype="multipart/form-data">
          <div class="grid">
            <label>Hero kicker<input type="text" name="home[hero_kicker]" value="<?= e((string)($home['hero_kicker'] ?? '')) ?>" /></label>
            <label>Hero tittel<textarea name="home[hero_title]" rows="2"><?= e((string)($home['hero_title'] ?? '')) ?></textarea></label>
            <label>Hero tekst<textarea name="home[hero_text]" rows="3"><?= e((string)($home['hero_text'] ?? '')) ?></textarea></label>
            <label>Primær knapp tekst<input type="text" name="home[hero_primary_label]" value="<?= e((string)($home['hero_primary_label'] ?? '')) ?>" /></label>
            <label>Primær knapp URL<input type="text" name="home[hero_primary_url]" value="<?= e((string)($home['hero_primary_url'] ?? '')) ?>" /></label>
            <label>Sekundær knapp tekst<input type="text" name="home[hero_secondary_label]" value="<?= e((string)($home['hero_secondary_label'] ?? '')) ?>" /></label>
            <label>Sekundær knapp URL<input type="text" name="home[hero_secondary_url]" value="<?= e((string)($home['hero_secondary_url'] ?? '')) ?>" /></label>

            <label>Hero bilde sti<input type="text" name="home[hero_image]" value="<?= e((string)($home['hero_image'] ?? '')) ?>" /></label>
            <label>Last opp hero bilde<input type="file" name="hero_image_upload" accept=".jpg,.jpeg,.png,.webp,.gif,.svg" /></label>

            <label>About tittel<textarea name="home[about_title]" rows="2"><?= e((string)($home['about_title'] ?? '')) ?></textarea></label>
            <label>About tekst 1<textarea name="home[about_text_1]" rows="3"><?= e((string)($home['about_text_1'] ?? '')) ?></textarea></label>
            <label>About tekst 2<textarea name="home[about_text_2]" rows="3"><?= e((string)($home['about_text_2'] ?? '')) ?></textarea></label>
            <label>About bilde sti<input type="text" name="home[about_image]" value="<?= e((string)($home['about_image'] ?? '')) ?>" /></label>
            <label>Last opp about bilde<input type="file" name="about_image_upload" accept=".jpg,.jpeg,.png,.webp,.gif,.svg" /></label>
          </div>
          <button type="submit">Lagre endringer</button>
        </form>
      </section>
    <?php endif; ?>
  </main>
</body>
</html>
