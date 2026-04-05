import {test, expect} from '@playwright/test'

test.describe('Page de choix du mode de jeu - PokeBaston', () => {
    //avant chaque test on vas sur la page de setup
    test.beforeEach(async ({page}) => {
        await page.goto('/setup');   
    });

    test('Verifier l\'affichage des elements de base' , async ({page})=> {
        const title = page.locator('h1')
        await expect(title).toHaveText('Créer une partie');
        const selectorButton = page.getByRole('checkbox', {name: /local/i})
        const selectorButton2 = page.getByRole('checkbox', {name: /online/i})
        const test = page.getByRole('radiogroup', )
        await expect(selectorButton).toBeChecked();
        await expect(selectorButton2).not.toBeChecked();
        

    });
    test('Navigation vers la page setup/trainer-1', async ({page}) => { 
        const validateButton = page.getByRole('link', {name: /Valider/i});
        await validateButton.click();

        await expect(page).toHaveURL(/\setup\/trainer-1/);
    });

    test('Verification du style (regression visuelle)', async ({page}) => {
        await expect(page).toHaveScreenshot('setup-page.png')
    })


});