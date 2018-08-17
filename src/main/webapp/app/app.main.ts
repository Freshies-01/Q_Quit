import { platformBrowserDynamic } from "@angular/platform-browser-dynamic";
import { ProdConfig } from "./blocks/config/prod.config";
import { QQuitAppModule } from "./app.module";
import "hammerjs";

ProdConfig();

if (module["hot"]) {
  module["hot"].accept();
}

platformBrowserDynamic()
  .bootstrapModule(QQuitAppModule, { preserveWhitespaces: true })
  .then(success => console.log(`Application started`))
  .catch(err => console.error(err));
