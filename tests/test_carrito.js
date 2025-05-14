const { Builder, By, until } = require('selenium-webdriver');

async function agregarProductoCumpleteria() {
  let driver = await new Builder().forBrowser('chrome').build();

  try {
    // 1. Ir al menú de productos
    await driver.get('http://localhost:8100/menu');

    // 2. Esperar que cargue al menos un producto
    await driver.wait(until.elementLocated(By.xpath("//*[contains(text(), 'Agregar al Carrito')]")), 10000);

    // 3. Hacer clic en el primer botón "Agregar al Carrito"
    let botonAgregar = await driver.findElement(By.xpath("(//*[contains(text(), 'Agregar al Carrito')])[1]"));
    await botonAgregar.click();

    // 4. Ir al carrito (puedes ajustar la ruta si usas una ruta diferente)
    await driver.sleep(1000);
    await driver.get('http://localhost:8100/carrito');

    // 5. Verificar que el producto fue añadido
    await driver.wait(until.elementLocated(By.xpath("//*[contains(text(), 'Completo') or contains(text(), 'completo')]")), 5000);

    console.log('✅ Producto añadido correctamente al carrito');
  } catch (error) {
    console.error('❌ Error durante la prueba:', error);
  } finally {
    await driver.quit();
  }
}

agregarProductoCumpleteria();
