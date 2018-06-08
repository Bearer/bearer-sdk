/**
 * This is an autogenerated file created by the Stencil build process.
 * It contains typing information for all components that exist in this project
 * and imports for stencil collections that might be configured in your stencil.config.js file
 */

import '@stencil/core';

declare global {
  namespace JSX {
    interface Element {}
    export interface IntrinsicElements {}
  }
  namespace JSXElements {}

  interface HTMLElement {
    componentOnReady?: () => Promise<this | null>;
  }

  interface HTMLStencilElement extends HTMLElement {
    componentOnReady(): Promise<this>;

    forceUpdate(): void;
  }

  interface HTMLAttributes {}
}

import '@stencil/router';
import '@stencil/state-tunnel';


declare global {

  namespace StencilComponents {
    interface AppDemo {

    }
  }

  interface HTMLAppDemoElement extends StencilComponents.AppDemo, HTMLStencilElement {}

  var HTMLAppDemoElement: {
    prototype: HTMLAppDemoElement;
    new (): HTMLAppDemoElement;
  };
  interface HTMLElementTagNameMap {
    'app-demo': HTMLAppDemoElement;
  }
  interface ElementTagNameMap {
    'app-demo': HTMLAppDemoElement;
  }
  namespace JSX {
    interface IntrinsicElements {
      'app-demo': JSXElements.AppDemoAttributes;
    }
  }
  namespace JSXElements {
    export interface AppDemoAttributes extends HTMLAttributes {

    }
  }
}


declare global {

  namespace StencilComponents {
    interface AppForms {

    }
  }

  interface HTMLAppFormsElement extends StencilComponents.AppForms, HTMLStencilElement {}

  var HTMLAppFormsElement: {
    prototype: HTMLAppFormsElement;
    new (): HTMLAppFormsElement;
  };
  interface HTMLElementTagNameMap {
    'app-forms': HTMLAppFormsElement;
  }
  interface ElementTagNameMap {
    'app-forms': HTMLAppFormsElement;
  }
  namespace JSX {
    interface IntrinsicElements {
      'app-forms': JSXElements.AppFormsAttributes;
    }
  }
  namespace JSXElements {
    export interface AppFormsAttributes extends HTMLAttributes {

    }
  }
}


declare global {

  namespace StencilComponents {
    interface AppHome {

    }
  }

  interface HTMLAppHomeElement extends StencilComponents.AppHome, HTMLStencilElement {}

  var HTMLAppHomeElement: {
    prototype: HTMLAppHomeElement;
    new (): HTMLAppHomeElement;
  };
  interface HTMLElementTagNameMap {
    'app-home': HTMLAppHomeElement;
  }
  interface ElementTagNameMap {
    'app-home': HTMLAppHomeElement;
  }
  namespace JSX {
    interface IntrinsicElements {
      'app-home': JSXElements.AppHomeAttributes;
    }
  }
  namespace JSXElements {
    export interface AppHomeAttributes extends HTMLAttributes {
      'onStepCompleted'?: (event: CustomEvent) => void;
    }
  }
}


declare global {

  namespace StencilComponents {
    interface AppSetup {

    }
  }

  interface HTMLAppSetupElement extends StencilComponents.AppSetup, HTMLStencilElement {}

  var HTMLAppSetupElement: {
    prototype: HTMLAppSetupElement;
    new (): HTMLAppSetupElement;
  };
  interface HTMLElementTagNameMap {
    'app-setup': HTMLAppSetupElement;
  }
  interface ElementTagNameMap {
    'app-setup': HTMLAppSetupElement;
  }
  namespace JSX {
    interface IntrinsicElements {
      'app-setup': JSXElements.AppSetupAttributes;
    }
  }
  namespace JSXElements {
    export interface AppSetupAttributes extends HTMLAttributes {

    }
  }
}


declare global {

  namespace StencilComponents {
    interface AppUi {

    }
  }

  interface HTMLAppUiElement extends StencilComponents.AppUi, HTMLStencilElement {}

  var HTMLAppUiElement: {
    prototype: HTMLAppUiElement;
    new (): HTMLAppUiElement;
  };
  interface HTMLElementTagNameMap {
    'app-ui': HTMLAppUiElement;
  }
  interface ElementTagNameMap {
    'app-ui': HTMLAppUiElement;
  }
  namespace JSX {
    interface IntrinsicElements {
      'app-ui': JSXElements.AppUiAttributes;
    }
  }
  namespace JSXElements {
    export interface AppUiAttributes extends HTMLAttributes {

    }
  }
}


declare global {

  namespace StencilComponents {
    interface AppNavigatorFinish {

    }
  }

  interface HTMLAppNavigatorFinishElement extends StencilComponents.AppNavigatorFinish, HTMLStencilElement {}

  var HTMLAppNavigatorFinishElement: {
    prototype: HTMLAppNavigatorFinishElement;
    new (): HTMLAppNavigatorFinishElement;
  };
  interface HTMLElementTagNameMap {
    'app-navigator-finish': HTMLAppNavigatorFinishElement;
  }
  interface ElementTagNameMap {
    'app-navigator-finish': HTMLAppNavigatorFinishElement;
  }
  namespace JSX {
    interface IntrinsicElements {
      'app-navigator-finish': JSXElements.AppNavigatorFinishAttributes;
    }
  }
  namespace JSXElements {
    export interface AppNavigatorFinishAttributes extends HTMLAttributes {
      'onScenarioCompleted'?: (event: CustomEvent) => void;
    }
  }
}


declare global {

  namespace StencilComponents {
    interface AppNavigatorNext {

    }
  }

  interface HTMLAppNavigatorNextElement extends StencilComponents.AppNavigatorNext, HTMLStencilElement {}

  var HTMLAppNavigatorNextElement: {
    prototype: HTMLAppNavigatorNextElement;
    new (): HTMLAppNavigatorNextElement;
  };
  interface HTMLElementTagNameMap {
    'app-navigator-next': HTMLAppNavigatorNextElement;
  }
  interface ElementTagNameMap {
    'app-navigator-next': HTMLAppNavigatorNextElement;
  }
  namespace JSX {
    interface IntrinsicElements {
      'app-navigator-next': JSXElements.AppNavigatorNextAttributes;
    }
  }
  namespace JSXElements {
    export interface AppNavigatorNextAttributes extends HTMLAttributes {
      'onStepCompleted'?: (event: CustomEvent) => void;
    }
  }
}


declare global {

  namespace StencilComponents {
    interface AppNavigator {

    }
  }

  interface HTMLAppNavigatorElement extends StencilComponents.AppNavigator, HTMLStencilElement {}

  var HTMLAppNavigatorElement: {
    prototype: HTMLAppNavigatorElement;
    new (): HTMLAppNavigatorElement;
  };
  interface HTMLElementTagNameMap {
    'app-navigator': HTMLAppNavigatorElement;
  }
  interface ElementTagNameMap {
    'app-navigator': HTMLAppNavigatorElement;
  }
  namespace JSX {
    interface IntrinsicElements {
      'app-navigator': JSXElements.AppNavigatorAttributes;
    }
  }
  namespace JSXElements {
    export interface AppNavigatorAttributes extends HTMLAttributes {

    }
  }
}


declare global {

  namespace StencilComponents {
    interface NavigatorCollectionItem {
      'item': { img: string; name: string; style: string };
    }
  }

  interface HTMLNavigatorCollectionItemElement extends StencilComponents.NavigatorCollectionItem, HTMLStencilElement {}

  var HTMLNavigatorCollectionItemElement: {
    prototype: HTMLNavigatorCollectionItemElement;
    new (): HTMLNavigatorCollectionItemElement;
  };
  interface HTMLElementTagNameMap {
    'navigator-collection-item': HTMLNavigatorCollectionItemElement;
  }
  interface ElementTagNameMap {
    'navigator-collection-item': HTMLNavigatorCollectionItemElement;
  }
  namespace JSX {
    interface IntrinsicElements {
      'navigator-collection-item': JSXElements.NavigatorCollectionItemAttributes;
    }
  }
  namespace JSXElements {
    export interface NavigatorCollectionItemAttributes extends HTMLAttributes {
      'item'?: { img: string; name: string; style: string };
    }
  }
}


declare global {

  namespace StencilComponents {
    interface AppPagination {

    }
  }

  interface HTMLAppPaginationElement extends StencilComponents.AppPagination, HTMLStencilElement {}

  var HTMLAppPaginationElement: {
    prototype: HTMLAppPaginationElement;
    new (): HTMLAppPaginationElement;
  };
  interface HTMLElementTagNameMap {
    'app-pagination': HTMLAppPaginationElement;
  }
  interface ElementTagNameMap {
    'app-pagination': HTMLAppPaginationElement;
  }
  namespace JSX {
    interface IntrinsicElements {
      'app-pagination': JSXElements.AppPaginationAttributes;
    }
  }
  namespace JSXElements {
    export interface AppPaginationAttributes extends HTMLAttributes {

    }
  }
}


declare global {

  namespace StencilComponents {
    interface AppScrollable {

    }
  }

  interface HTMLAppScrollableElement extends StencilComponents.AppScrollable, HTMLStencilElement {}

  var HTMLAppScrollableElement: {
    prototype: HTMLAppScrollableElement;
    new (): HTMLAppScrollableElement;
  };
  interface HTMLElementTagNameMap {
    'app-scrollable': HTMLAppScrollableElement;
  }
  interface ElementTagNameMap {
    'app-scrollable': HTMLAppScrollableElement;
  }
  namespace JSX {
    interface IntrinsicElements {
      'app-scrollable': JSXElements.AppScrollableAttributes;
    }
  }
  namespace JSXElements {
    export interface AppScrollableAttributes extends HTMLAttributes {

    }
  }
}


declare global {

  namespace StencilComponents {
    interface BearerAlert {
      'kind': 'primary'
    | 'secondary'
    | 'success'
    | 'danger'
    | 'warning'
    | 'info'
    | 'light'
    | 'dark';
      'onDismiss': () => void;
    }
  }

  interface HTMLBearerAlertElement extends StencilComponents.BearerAlert, HTMLStencilElement {}

  var HTMLBearerAlertElement: {
    prototype: HTMLBearerAlertElement;
    new (): HTMLBearerAlertElement;
  };
  interface HTMLElementTagNameMap {
    'bearer-alert': HTMLBearerAlertElement;
  }
  interface ElementTagNameMap {
    'bearer-alert': HTMLBearerAlertElement;
  }
  namespace JSX {
    interface IntrinsicElements {
      'bearer-alert': JSXElements.BearerAlertAttributes;
    }
  }
  namespace JSXElements {
    export interface BearerAlertAttributes extends HTMLAttributes {
      'kind'?: 'primary'
    | 'secondary'
    | 'success'
    | 'danger'
    | 'warning'
    | 'info'
    | 'light'
    | 'dark';
      'onDismiss'?: () => void;
    }
  }
}


declare global {

  namespace StencilComponents {
    interface BearerBadge {
      'kind': 'primary'
    | 'secondary'
    | 'success'
    | 'danger'
    | 'warning'
    | 'info'
    | 'light'
    | 'dark';
    }
  }

  interface HTMLBearerBadgeElement extends StencilComponents.BearerBadge, HTMLStencilElement {}

  var HTMLBearerBadgeElement: {
    prototype: HTMLBearerBadgeElement;
    new (): HTMLBearerBadgeElement;
  };
  interface HTMLElementTagNameMap {
    'bearer-badge': HTMLBearerBadgeElement;
  }
  interface ElementTagNameMap {
    'bearer-badge': HTMLBearerBadgeElement;
  }
  namespace JSX {
    interface IntrinsicElements {
      'bearer-badge': JSXElements.BearerBadgeAttributes;
    }
  }
  namespace JSXElements {
    export interface BearerBadgeAttributes extends HTMLAttributes {
      'kind'?: 'primary'
    | 'secondary'
    | 'success'
    | 'danger'
    | 'warning'
    | 'info'
    | 'light'
    | 'dark';
    }
  }
}


declare global {

  namespace StencilComponents {
    interface BearerButton {
      'as': string;
      'kind': 'primary'
    | 'secondary'
    | 'success'
    | 'danger'
    | 'warning'
    | 'info'
    | 'light'
    | 'dark';
      'size': 'md' | 'sm' | 'lg';
    }
  }

  interface HTMLBearerButtonElement extends StencilComponents.BearerButton, HTMLStencilElement {}

  var HTMLBearerButtonElement: {
    prototype: HTMLBearerButtonElement;
    new (): HTMLBearerButtonElement;
  };
  interface HTMLElementTagNameMap {
    'bearer-button': HTMLBearerButtonElement;
  }
  interface ElementTagNameMap {
    'bearer-button': HTMLBearerButtonElement;
  }
  namespace JSX {
    interface IntrinsicElements {
      'bearer-button': JSXElements.BearerButtonAttributes;
    }
  }
  namespace JSXElements {
    export interface BearerButtonAttributes extends HTMLAttributes {
      'as'?: string;
      'kind'?: 'primary'
    | 'secondary'
    | 'success'
    | 'danger'
    | 'warning'
    | 'info'
    | 'light'
    | 'dark';
      'size'?: 'md' | 'sm' | 'lg';
    }
  }
}


declare global {

  namespace StencilComponents {
    interface BearerForm {
      'fields': Array<any>;
    }
  }

  interface HTMLBearerFormElement extends StencilComponents.BearerForm, HTMLStencilElement {}

  var HTMLBearerFormElement: {
    prototype: HTMLBearerFormElement;
    new (): HTMLBearerFormElement;
  };
  interface HTMLElementTagNameMap {
    'bearer-form': HTMLBearerFormElement;
  }
  interface ElementTagNameMap {
    'bearer-form': HTMLBearerFormElement;
  }
  namespace JSX {
    interface IntrinsicElements {
      'bearer-form': JSXElements.BearerFormAttributes;
    }
  }
  namespace JSXElements {
    export interface BearerFormAttributes extends HTMLAttributes {
      'fields'?: Array<any>;
      'onSubmit'?: (event: CustomEvent) => void;
    }
  }
}


declare global {

  namespace StencilComponents {
    interface BearerInput {
      'controlName': string;
      'hint': string;
      'label': string;
      'placeholder': string;
      'type': string;
      'value': string;
    }
  }

  interface HTMLBearerInputElement extends StencilComponents.BearerInput, HTMLStencilElement {}

  var HTMLBearerInputElement: {
    prototype: HTMLBearerInputElement;
    new (): HTMLBearerInputElement;
  };
  interface HTMLElementTagNameMap {
    'bearer-input': HTMLBearerInputElement;
  }
  interface ElementTagNameMap {
    'bearer-input': HTMLBearerInputElement;
  }
  namespace JSX {
    interface IntrinsicElements {
      'bearer-input': JSXElements.BearerInputAttributes;
    }
  }
  namespace JSXElements {
    export interface BearerInputAttributes extends HTMLAttributes {
      'controlName'?: string;
      'hint'?: string;
      'label'?: string;
      'onSubmit'?: (event: CustomEvent) => void;
      'onValueChange'?: (event: CustomEvent) => void;
      'placeholder'?: string;
      'type'?: string;
      'value'?: string;
    }
  }
}


declare global {

  namespace StencilComponents {
    interface BearerTextarea {
      'controlName': string;
      'hint': string;
      'label': string;
      'placeholder': string;
      'value': string;
    }
  }

  interface HTMLBearerTextareaElement extends StencilComponents.BearerTextarea, HTMLStencilElement {}

  var HTMLBearerTextareaElement: {
    prototype: HTMLBearerTextareaElement;
    new (): HTMLBearerTextareaElement;
  };
  interface HTMLElementTagNameMap {
    'bearer-textarea': HTMLBearerTextareaElement;
  }
  interface ElementTagNameMap {
    'bearer-textarea': HTMLBearerTextareaElement;
  }
  namespace JSX {
    interface IntrinsicElements {
      'bearer-textarea': JSXElements.BearerTextareaAttributes;
    }
  }
  namespace JSXElements {
    export interface BearerTextareaAttributes extends HTMLAttributes {
      'controlName'?: string;
      'hint'?: string;
      'label'?: string;
      'onValueChange'?: (event: CustomEvent) => void;
      'placeholder'?: string;
      'value'?: string;
    }
  }
}


declare global {

  namespace StencilComponents {
    interface BearerLoading {

    }
  }

  interface HTMLBearerLoadingElement extends StencilComponents.BearerLoading, HTMLStencilElement {}

  var HTMLBearerLoadingElement: {
    prototype: HTMLBearerLoadingElement;
    new (): HTMLBearerLoadingElement;
  };
  interface HTMLElementTagNameMap {
    'bearer-loading': HTMLBearerLoadingElement;
  }
  interface ElementTagNameMap {
    'bearer-loading': HTMLBearerLoadingElement;
  }
  namespace JSX {
    interface IntrinsicElements {
      'bearer-loading': JSXElements.BearerLoadingAttributes;
    }
  }
  namespace JSXElements {
    export interface BearerLoadingAttributes extends HTMLAttributes {

    }
  }
}


declare global {

  namespace StencilComponents {
    interface BearerTypography {
      'as': string;
      'kind': ''
    | 'h1'
    | 'h2'
    | 'h3'
    | 'h4'
    | 'h5'
    | 'h6'
    | 'text-muted'
    | 'display-1'
    | 'display-2'
    | 'display-3'
    | 'display-4';
    }
  }

  interface HTMLBearerTypographyElement extends StencilComponents.BearerTypography, HTMLStencilElement {}

  var HTMLBearerTypographyElement: {
    prototype: HTMLBearerTypographyElement;
    new (): HTMLBearerTypographyElement;
  };
  interface HTMLElementTagNameMap {
    'bearer-typography': HTMLBearerTypographyElement;
  }
  interface ElementTagNameMap {
    'bearer-typography': HTMLBearerTypographyElement;
  }
  namespace JSX {
    interface IntrinsicElements {
      'bearer-typography': JSXElements.BearerTypographyAttributes;
    }
  }
  namespace JSXElements {
    export interface BearerTypographyAttributes extends HTMLAttributes {
      'as'?: string;
      'kind'?: ''
    | 'h1'
    | 'h2'
    | 'h3'
    | 'h4'
    | 'h5'
    | 'h6'
    | 'text-muted'
    | 'display-1'
    | 'display-2'
    | 'display-3'
    | 'display-4';
    }
  }
}


declare global {

  namespace StencilComponents {
    interface AuthConfig {

    }
  }

  interface HTMLAuthConfigElement extends StencilComponents.AuthConfig, HTMLStencilElement {}

  var HTMLAuthConfigElement: {
    prototype: HTMLAuthConfigElement;
    new (): HTMLAuthConfigElement;
  };
  interface HTMLElementTagNameMap {
    'auth-config': HTMLAuthConfigElement;
  }
  interface ElementTagNameMap {
    'auth-config': HTMLAuthConfigElement;
  }
  namespace JSX {
    interface IntrinsicElements {
      'auth-config': JSXElements.AuthConfigAttributes;
    }
  }
  namespace JSXElements {
    export interface AuthConfigAttributes extends HTMLAttributes {
      'onSubmit'?: (event: CustomEvent) => void;
    }
  }
}


declare global {

  namespace StencilComponents {
    interface BearerButtonPopover {
      'arrow': boolean;
      'backNav': boolean;
      'btnKind': 'primary'
    | 'secondary'
    | 'success'
    | 'danger'
    | 'warning'
    | 'info'
    | 'light'
    | 'dark';
      'direction': string;
      'header': string;
      'opened': boolean;
      'toggle': (opened: boolean) => void;
    }
  }

  interface HTMLBearerButtonPopoverElement extends StencilComponents.BearerButtonPopover, HTMLStencilElement {}

  var HTMLBearerButtonPopoverElement: {
    prototype: HTMLBearerButtonPopoverElement;
    new (): HTMLBearerButtonPopoverElement;
  };
  interface HTMLElementTagNameMap {
    'bearer-button-popover': HTMLBearerButtonPopoverElement;
  }
  interface ElementTagNameMap {
    'bearer-button-popover': HTMLBearerButtonPopoverElement;
  }
  namespace JSX {
    interface IntrinsicElements {
      'bearer-button-popover': JSXElements.BearerButtonPopoverAttributes;
    }
  }
  namespace JSXElements {
    export interface BearerButtonPopoverAttributes extends HTMLAttributes {
      'arrow'?: boolean;
      'backNav'?: boolean;
      'btnKind'?: 'primary'
    | 'secondary'
    | 'success'
    | 'danger'
    | 'warning'
    | 'info'
    | 'light'
    | 'dark';
      'direction'?: string;
      'header'?: string;
      'opened'?: boolean;
    }
  }
}


declare global {

  namespace StencilComponents {
    interface BearerDropdownButton {
      'btnKind': 'primary'
    | 'secondary'
    | 'success'
    | 'danger'
    | 'warning'
    | 'info'
    | 'light'
    | 'dark';
      'innerListener': string;
      'opened': boolean;
      'toggle': (opened: boolean) => void;
    }
  }

  interface HTMLBearerDropdownButtonElement extends StencilComponents.BearerDropdownButton, HTMLStencilElement {}

  var HTMLBearerDropdownButtonElement: {
    prototype: HTMLBearerDropdownButtonElement;
    new (): HTMLBearerDropdownButtonElement;
  };
  interface HTMLElementTagNameMap {
    'bearer-dropdown-button': HTMLBearerDropdownButtonElement;
  }
  interface ElementTagNameMap {
    'bearer-dropdown-button': HTMLBearerDropdownButtonElement;
  }
  namespace JSX {
    interface IntrinsicElements {
      'bearer-dropdown-button': JSXElements.BearerDropdownButtonAttributes;
    }
  }
  namespace JSXElements {
    export interface BearerDropdownButtonAttributes extends HTMLAttributes {
      'btnKind'?: 'primary'
    | 'secondary'
    | 'success'
    | 'danger'
    | 'warning'
    | 'info'
    | 'light'
    | 'dark';
      'innerListener'?: string;
      'opened'?: boolean;
    }
  }
}


declare global {

  namespace StencilComponents {
    interface BearerNavigatorAuthScreen {
      'getTitle': () => string;
      'setupId': string;
      'willAppear': () => void;
      'willDisappear': () => void;
    }
  }

  interface HTMLBearerNavigatorAuthScreenElement extends StencilComponents.BearerNavigatorAuthScreen, HTMLStencilElement {}

  var HTMLBearerNavigatorAuthScreenElement: {
    prototype: HTMLBearerNavigatorAuthScreenElement;
    new (): HTMLBearerNavigatorAuthScreenElement;
  };
  interface HTMLElementTagNameMap {
    'bearer-navigator-auth-screen': HTMLBearerNavigatorAuthScreenElement;
  }
  interface ElementTagNameMap {
    'bearer-navigator-auth-screen': HTMLBearerNavigatorAuthScreenElement;
  }
  namespace JSX {
    interface IntrinsicElements {
      'bearer-navigator-auth-screen': JSXElements.BearerNavigatorAuthScreenAttributes;
    }
  }
  namespace JSXElements {
    export interface BearerNavigatorAuthScreenAttributes extends HTMLAttributes {
      'onScenarioAuthenticate'?: (event: CustomEvent) => void;
      'onStepCompleted'?: (event: CustomEvent) => void;
      'setupId'?: string;
    }
  }
}


declare global {

  namespace StencilComponents {
    interface BearerNavigatorBack {
      'disabled': boolean;
    }
  }

  interface HTMLBearerNavigatorBackElement extends StencilComponents.BearerNavigatorBack, HTMLStencilElement {}

  var HTMLBearerNavigatorBackElement: {
    prototype: HTMLBearerNavigatorBackElement;
    new (): HTMLBearerNavigatorBackElement;
  };
  interface HTMLElementTagNameMap {
    'bearer-navigator-back': HTMLBearerNavigatorBackElement;
  }
  interface ElementTagNameMap {
    'bearer-navigator-back': HTMLBearerNavigatorBackElement;
  }
  namespace JSX {
    interface IntrinsicElements {
      'bearer-navigator-back': JSXElements.BearerNavigatorBackAttributes;
    }
  }
  namespace JSXElements {
    export interface BearerNavigatorBackAttributes extends HTMLAttributes {
      'disabled'?: boolean;
      'onNavigatorGoBack'?: (event: CustomEvent) => void;
    }
  }
}


declare global {

  namespace StencilComponents {
    interface BearerNavigatorCollection {
      'data': any;
      'renderFunc': (member: any) => void;
    }
  }

  interface HTMLBearerNavigatorCollectionElement extends StencilComponents.BearerNavigatorCollection, HTMLStencilElement {}

  var HTMLBearerNavigatorCollectionElement: {
    prototype: HTMLBearerNavigatorCollectionElement;
    new (): HTMLBearerNavigatorCollectionElement;
  };
  interface HTMLElementTagNameMap {
    'bearer-navigator-collection': HTMLBearerNavigatorCollectionElement;
  }
  interface ElementTagNameMap {
    'bearer-navigator-collection': HTMLBearerNavigatorCollectionElement;
  }
  namespace JSX {
    interface IntrinsicElements {
      'bearer-navigator-collection': JSXElements.BearerNavigatorCollectionAttributes;
    }
  }
  namespace JSXElements {
    export interface BearerNavigatorCollectionAttributes extends HTMLAttributes {
      'data'?: any;
      'onCompleteScreen'?: (event: CustomEvent) => void;
      'renderFunc'?: (member: any) => void;
    }
  }
}


declare global {

  namespace StencilComponents {
    interface BearerNavigatorScreen {
      'getTitle': () => any;
      'name': string;
      'navigationTitle': any;
      'renderFunc': (data: any) => void;
      'willAppear': (data: any) => void;
      'willDisappear': () => void;
    }
  }

  interface HTMLBearerNavigatorScreenElement extends StencilComponents.BearerNavigatorScreen, HTMLStencilElement {}

  var HTMLBearerNavigatorScreenElement: {
    prototype: HTMLBearerNavigatorScreenElement;
    new (): HTMLBearerNavigatorScreenElement;
  };
  interface HTMLElementTagNameMap {
    'bearer-navigator-screen': HTMLBearerNavigatorScreenElement;
  }
  interface ElementTagNameMap {
    'bearer-navigator-screen': HTMLBearerNavigatorScreenElement;
  }
  namespace JSX {
    interface IntrinsicElements {
      'bearer-navigator-screen': JSXElements.BearerNavigatorScreenAttributes;
    }
  }
  namespace JSXElements {
    export interface BearerNavigatorScreenAttributes extends HTMLAttributes {
      'name'?: string;
      'navigationTitle'?: any;
      'onNavigatorGoBack'?: (event: CustomEvent) => void;
      'onStepCompleted'?: (event: CustomEvent) => void;
      'renderFunc'?: (data: any) => void;
    }
  }
}


declare global {

  namespace StencilComponents {
    interface BearerNavigator {

    }
  }

  interface HTMLBearerNavigatorElement extends StencilComponents.BearerNavigator, HTMLStencilElement {}

  var HTMLBearerNavigatorElement: {
    prototype: HTMLBearerNavigatorElement;
    new (): HTMLBearerNavigatorElement;
  };
  interface HTMLElementTagNameMap {
    'bearer-navigator': HTMLBearerNavigatorElement;
  }
  interface ElementTagNameMap {
    'bearer-navigator': HTMLBearerNavigatorElement;
  }
  namespace JSX {
    interface IntrinsicElements {
      'bearer-navigator': JSXElements.BearerNavigatorAttributes;
    }
  }
  namespace JSXElements {
    export interface BearerNavigatorAttributes extends HTMLAttributes {

    }
  }
}


declare global {

  namespace StencilComponents {
    interface BearerPagination {
      'currentPage': number;
      'displayNextPrev': boolean;
      'displayPages': boolean;
      'hasNext': boolean;
      'pageCount': number;
      'window': number;
    }
  }

  interface HTMLBearerPaginationElement extends StencilComponents.BearerPagination, HTMLStencilElement {}

  var HTMLBearerPaginationElement: {
    prototype: HTMLBearerPaginationElement;
    new (): HTMLBearerPaginationElement;
  };
  interface HTMLElementTagNameMap {
    'bearer-pagination': HTMLBearerPaginationElement;
  }
  interface ElementTagNameMap {
    'bearer-pagination': HTMLBearerPaginationElement;
  }
  namespace JSX {
    interface IntrinsicElements {
      'bearer-pagination': JSXElements.BearerPaginationAttributes;
    }
  }
  namespace JSXElements {
    export interface BearerPaginationAttributes extends HTMLAttributes {
      'currentPage'?: number;
      'displayNextPrev'?: boolean;
      'displayPages'?: boolean;
      'hasNext'?: boolean;
      'onBearerPaginationGoTo'?: (event: CustomEvent) => void;
      'onBearerPaginationNext'?: (event: CustomEvent) => void;
      'onBearerPaginationPrev'?: (event: CustomEvent) => void;
      'pageCount'?: number;
      'window'?: number;
    }
  }
}


declare global {

  namespace StencilComponents {
    interface BearerPaginator {
      'fetcher': (refineParams: { page: number }) => Promise<{ items: Array<any> }>;
      'pageCount': number;
      'perPage': number;
      'renderCollection': (collection: Array<any>) => any;
      'renderFetching': () => any;
      'reset': () => void;
    }
  }

  interface HTMLBearerPaginatorElement extends StencilComponents.BearerPaginator, HTMLStencilElement {}

  var HTMLBearerPaginatorElement: {
    prototype: HTMLBearerPaginatorElement;
    new (): HTMLBearerPaginatorElement;
  };
  interface HTMLElementTagNameMap {
    'bearer-paginator': HTMLBearerPaginatorElement;
  }
  interface ElementTagNameMap {
    'bearer-paginator': HTMLBearerPaginatorElement;
  }
  namespace JSX {
    interface IntrinsicElements {
      'bearer-paginator': JSXElements.BearerPaginatorAttributes;
    }
  }
  namespace JSXElements {
    export interface BearerPaginatorAttributes extends HTMLAttributes {
      'fetcher'?: (refineParams: { page: number }) => Promise<{ items: Array<any> }>;
      'pageCount'?: number;
      'perPage'?: number;
      'renderCollection'?: (collection: Array<any>) => any;
      'renderFetching'?: () => any;
    }
  }
}


declare global {

  namespace StencilComponents {
    interface BearerPopoverNavigator {
      'button': string;
      'direction': string;
    }
  }

  interface HTMLBearerPopoverNavigatorElement extends StencilComponents.BearerPopoverNavigator, HTMLStencilElement {}

  var HTMLBearerPopoverNavigatorElement: {
    prototype: HTMLBearerPopoverNavigatorElement;
    new (): HTMLBearerPopoverNavigatorElement;
  };
  interface HTMLElementTagNameMap {
    'bearer-popover-navigator': HTMLBearerPopoverNavigatorElement;
  }
  interface ElementTagNameMap {
    'bearer-popover-navigator': HTMLBearerPopoverNavigatorElement;
  }
  namespace JSX {
    interface IntrinsicElements {
      'bearer-popover-navigator': JSXElements.BearerPopoverNavigatorAttributes;
    }
  }
  namespace JSXElements {
    export interface BearerPopoverNavigatorAttributes extends HTMLAttributes {
      'button'?: string;
      'direction'?: string;
    }
  }
}


declare global {

  namespace StencilComponents {
    interface BearerScrollable {
      'fetcher': ({ page: number }) => Promise<{ items: Array<any> }>;
      'perPage': number;
      'renderCollection': (collection: Array<any>) => any;
      'renderFetching': () => any;
      'reset': () => void;
    }
  }

  interface HTMLBearerScrollableElement extends StencilComponents.BearerScrollable, HTMLStencilElement {}

  var HTMLBearerScrollableElement: {
    prototype: HTMLBearerScrollableElement;
    new (): HTMLBearerScrollableElement;
  };
  interface HTMLElementTagNameMap {
    'bearer-scrollable': HTMLBearerScrollableElement;
  }
  interface ElementTagNameMap {
    'bearer-scrollable': HTMLBearerScrollableElement;
  }
  namespace JSX {
    interface IntrinsicElements {
      'bearer-scrollable': JSXElements.BearerScrollableAttributes;
    }
  }
  namespace JSXElements {
    export interface BearerScrollableAttributes extends HTMLAttributes {
      'fetcher'?: ({ page: number }) => Promise<{ items: Array<any> }>;
      'perPage'?: number;
      'renderCollection'?: (collection: Array<any>) => any;
      'renderFetching'?: () => any;
    }
  }
}


declare global {

  namespace StencilComponents {
    interface BearerSetupDisplay {
      'setupId': string;
    }
  }

  interface HTMLBearerSetupDisplayElement extends StencilComponents.BearerSetupDisplay, HTMLStencilElement {}

  var HTMLBearerSetupDisplayElement: {
    prototype: HTMLBearerSetupDisplayElement;
    new (): HTMLBearerSetupDisplayElement;
  };
  interface HTMLElementTagNameMap {
    'bearer-setup-display': HTMLBearerSetupDisplayElement;
  }
  interface ElementTagNameMap {
    'bearer-setup-display': HTMLBearerSetupDisplayElement;
  }
  namespace JSX {
    interface IntrinsicElements {
      'bearer-setup-display': JSXElements.BearerSetupDisplayAttributes;
    }
  }
  namespace JSXElements {
    export interface BearerSetupDisplayAttributes extends HTMLAttributes {
      'setupId'?: string;
    }
  }
}


declare global {

  namespace StencilComponents {
    interface BearerSetup {
      'scenarioId': string;
    }
  }

  interface HTMLBearerSetupElement extends StencilComponents.BearerSetup, HTMLStencilElement {}

  var HTMLBearerSetupElement: {
    prototype: HTMLBearerSetupElement;
    new (): HTMLBearerSetupElement;
  };
  interface HTMLElementTagNameMap {
    'bearer-setup': HTMLBearerSetupElement;
  }
  interface ElementTagNameMap {
    'bearer-setup': HTMLBearerSetupElement;
  }
  namespace JSX {
    interface IntrinsicElements {
      'bearer-setup': JSXElements.BearerSetupAttributes;
    }
  }
  namespace JSXElements {
    export interface BearerSetupAttributes extends HTMLAttributes {
      'onStepCompleted'?: (event: CustomEvent) => void;
      'scenarioId'?: string;
    }
  }
}

declare global { namespace JSX { interface StencilJSX {} } }

export declare function defineCustomElements(window: any): void;