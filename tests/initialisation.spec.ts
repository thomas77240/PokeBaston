import {test, expect} from '@playwright/test'

test.describe('Page d\'accueil - Pokebaston', () => {

    // avant chaque test on va sur la page d'acceuil
    test.beforeEach(async ({page}) => {
        await page.goto('/');
    });

    test('Verifier l\'affichage des elements de base', async ({page})=> {
        // Verifie que le titre est correct
        const title = page.locator('h1');
        await expect(title).toHaveText('Accueil PokeBaston');

        // Le bouton lancer une game est-il present ?
        const startButton = page.getByRole('link', {name: /lancer une game/i});
        await expect(startButton).toBeVisible();
    });

    test('Navigation vers la page de setup', async ({page}) => {
        //clique sur le lien
        const startButton = page.getByRole('link', {name : /lancer une game/i});
        await startButton.click();

        //verification que l'url ait bien changé
        await expect(page).toHaveURL(/\/setup/);
    });

    test('Verification du style (regression visuelle)', async ({page}) => {
        //ce test assure que le design ne bouge pas
        await expect(page).toHaveScreenshot('home-page.png');
    });


});