async function cerrarSesion() {
    let driver = await new Builder().forBrowser('chrome').build();
  
    try {
      await driver.get('http://localhost:8100/perfil');
      await driver.wait(until.elementLocated(By.css('#btn-logout')), 10000);
  
      let logoutBtn = await driver.findElement(By.css('#btn-logout'));
      await logoutBtn.click();
  
      await driver.sleep(1500);
      let loginContainer = await driver.findElement(By.css('.login-container'));
  
      if (loginContainer) console.log('✅ Cierre de sesión exitoso, redirigido al login');
      else console.log('❌ No se redirigió correctamente');
  
    } finally {
      await driver.quit();
    }
  }
  