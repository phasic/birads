# Birads

This is the Birads report project, made with Angular2

The report is used to give a structured overview of the findings on the breast.

This report offers the possibility to add findings (based on the BIRADS standard) to the breast under the form of a visual annotation.

This annotation has a corresponding entry in a table with more details about it.

Based on all the findings the radiologist is expected to give a BIRADS and ACR score per breast.

For setting up a dev environment refer to [Healthcare wiki](http://wikihealthcare.agfa.net/display/clinapps/Setting+up+Angular+2+project+with+Angular-cli).

This project was generated with [angular-cli](https://github.com/angular/angular-cli) version 1.0.0-beta.15.

## Usage
__Mouse control__

Select a method on the top bar (mass, distortion, ...).

Click on a breast, then on the same breast but on the other perspective. 

Follow the stept on the screen.

__Hotkeys__


Q | W | E | ...: Select a method

1 | 2 | 3 | ... : Select a finding in the menus
	

## Development server
Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `-prod` flag for a production build.

## Notes

When switching between projects, clear the browser cache first. The hotkeys.json file gets cached, and will generate conflicts when switching.

## Further help

To get more help on the `angular-cli` use `ng --help` or go check out the [Angular-CLI README](https://github.com/angular/angular-cli/blob/master/README.md).
