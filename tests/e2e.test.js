
import { Builder, By, until } from "selenium-webdriver";
import chrome from "selenium-webdriver/chrome.js";

const options = new chrome.Options();
options.addArguments("--headless");

//Rejestracja tylko
async function registerUser() {
    let driver = await new Builder().forBrowser("chrome").setChromeOptions(options).build();

    try {
        // 1️. Otwórz stronę rejestracji
        await driver.get("http://localhost:3010/register");
        console.log("1. Strona rejestracji otwarta");

        // 2️. Wypełnij formularz rejestracji
        const uniqueEmail = `nowy${Date.now()}@example.com`;
        await driver.findElement(By.name("name")).sendKeys("Nowy");
        await driver.findElement(By.name("surname")).sendKeys("Użytkownik");
        await driver.findElement(By.name("email")).sendKeys(uniqueEmail);
        await driver.findElement(By.name("password")).sendKeys("test123");
        await driver.findElement(By.name("confirmPassword")).sendKeys("test123");
        await driver.findElement(By.name("age")).sendKeys(20);

        // 3️. Kliknij "Zarejestruj się"
        await driver.findElement(By.css("button[type='submit']")).click();
        await driver.wait(until.urlContains("/dashboard"), 5000);
        console.log("2. Rejestracja zakończona, przekierowanie do dashboardu");

        return uniqueEmail;

    } catch (error) {
        console.error("Test rejestracji negatywny:", error);
    } finally {
        await driver.quit();
        console.log("Test rejestracji zakończony\n");
    }
}

//Logowanie, zapis, wylogowanie
async function runTests(email) {
    let driver = await new Builder().forBrowser("chrome").setChromeOptions(options).build();

    try {
        await driver.get("http://localhost:3010/");
        console.log("1. Strona główna otwarta");

        await driver.findElement(By.linkText("Zaloguj się")).click();
        await driver.wait(until.urlContains("/login"), 5000);
        console.log("2. Przekierowanie do logowania");

        await driver.findElement(By.name("email")).sendKeys(email);
        await driver.findElement(By.name("password")).sendKeys("test123");
        await driver.findElement(By.css("button[type='submit']")).click();
        await driver.wait(until.urlContains("/dashboard"), 5000);
        console.log("3. Zalogowano pomyślnie");

        let myCoursesButton = await driver.wait(
            until.elementLocated(By.linkText("Zobacz moje kursy")),
            5000
        );

        await driver.executeScript("arguments[0].scrollIntoView({ behavior: 'smooth', block: 'center' });", myCoursesButton);
        await driver.wait(until.elementIsVisible(myCoursesButton), 3000);
        await driver.wait(until.elementIsEnabled(myCoursesButton), 3000);
        await myCoursesButton.click();
        await driver.wait(until.urlContains("/courses/mycourses"), 5000);
        console.log("4. Strona 'Moje Kursy' otwarta");

        let enrollButton = await driver.wait(
            until.elementLocated(By.css(".list-group-item form button.btn-primary")),
            5000
        );

        await driver.executeScript("arguments[0].scrollIntoView({ behavior: 'smooth', block: 'center' });", enrollButton);
        await driver.wait(until.elementIsVisible(enrollButton), 3000);
        await driver.wait(until.elementIsEnabled(enrollButton), 3000);
        await enrollButton.click();

        console.log("5. Zapisano się na kurs");

        await driver.wait(
            until.elementLocated(By.css(".badge.bg-success")),
            5000
        );

        console.log("6. Kurs zapisany poprawnie");

        let profileDropdown = await driver.wait(
            until.elementLocated(By.id("profileDropdown")),
            5000
        );
        await driver.executeScript("arguments[0].scrollIntoView({ behavior: 'smooth', block: 'center' });", profileDropdown);
        await driver.wait(until.elementIsVisible(profileDropdown), 3000);
        await driver.wait(until.elementIsEnabled(profileDropdown), 3000);
        await profileDropdown.click();

        let logoutButton = await driver.wait(
            until.elementLocated(By.linkText("Wyloguj się")),
            5000
        );
        await driver.wait(until.elementIsVisible(logoutButton), 3000);
        await driver.wait(until.elementIsEnabled(logoutButton), 3000);
        await logoutButton.click();
        await driver.wait(until.urlContains("/"), 5000);
        console.log("7. Wylogowano pomyślnie");

    } catch (error) {
        console.error("Test negatywny:", error);
    } finally {
        await driver.quit();
        console.log("Testy zakończone\n");
    }
}

// Koljenosc testów
async function main() {
    const email = await registerUser();
    if (email) {
        await runTests(email);
    }
}

main();
