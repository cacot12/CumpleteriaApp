const { Builder, By, until } = require('selenium-webdriver');

async function testFormularioTarjeta() {
  let driver = await new Builder().forBrowser('chrome').build();

  try {
    // 1. Accede a la aplicación
    await driver.get('http://localhost:8100');

    // 2. Espera a que se cargue el formulario de pago
    await driver.wait(until.elementLocated(By.css('.metodo-pago-container')), 10000);

    // 3. Selecciona la opción "Tarjeta" como método de pago
    let tarjetaOption = await driver.findElement(By.css('input[type="radio"][value="tarjeta"]'));
    await tarjetaOption.click();

    // 4. Espera a que el formulario dinámico de tarjeta aparezca
    await driver.wait(until.elementLocated(By.css('.formulario-tarjeta')), 5000);

    // 5. Verifica que los campos de tarjeta estén presentes
    let numeroTarjeta = await driver.findElement(By.css('input[name="numeroTarjeta"]'));
    let fechaExpiracion = await driver.findElement(By.css('input[name="fechaExpiracion"]'));
    let cvv = await driver.findElement(By.css('input[name="cvv"]'));

    if (numeroTarjeta && fechaExpiracion && cvv) {
      console.log('✅ El formulario de tarjeta se mostró correctamente al seleccionar "Tarjeta".');
    } else {
      console.log('❌ El formulario de tarjeta no apareció correctamente.');
    }

  } catch (error) {
    console.error('❌ Error durante la prueba:', error);
  } finally {
    await driver.quit();
  }
}

testFormularioTarjeta();
