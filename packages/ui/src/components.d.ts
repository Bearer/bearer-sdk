/**
 * This is an autogenerated file created by the Stencil compiler.
 * It contains typing information for all components that exist in this project.
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

import {
  FieldSet,
} from './components/Forms/Fieldset';
import {
  TMember,
  TMemberRenderer,
} from './components/navigator/types';
import {
  TCollectionRenderer,
} from './components/scrollable/types';

declare global {

  namespace StencilComponents {
    interface BearerAlert {
      'content': any;
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
      'content'?: any;
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
      'content': any;
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
      'content'?: any;
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
      'content': any;
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
      'content'?: any;
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
    interface BearerCheckbox {
      'buttons': Array<{ label: string; value: string; checked?: boolean }>;
      'controlName': string;
      'inline': boolean;
      'label': string;
      'value': Array<string>;
    }
  }

  interface HTMLBearerCheckboxElement extends StencilComponents.BearerCheckbox, HTMLStencilElement {}

  var HTMLBearerCheckboxElement: {
    prototype: HTMLBearerCheckboxElement;
    new (): HTMLBearerCheckboxElement;
  };
  interface HTMLElementTagNameMap {
    'bearer-checkbox': HTMLBearerCheckboxElement;
  }
  interface ElementTagNameMap {
    'bearer-checkbox': HTMLBearerCheckboxElement;
  }
  namespace JSX {
    interface IntrinsicElements {
      'bearer-checkbox': JSXElements.BearerCheckboxAttributes;
    }
  }
  namespace JSXElements {
    export interface BearerCheckboxAttributes extends HTMLAttributes {
      'buttons'?: Array<{ label: string; value: string; checked?: boolean }>;
      'controlName'?: string;
      'inline'?: boolean;
      'label'?: string;
      'onValueChange'?: (event: CustomEvent) => void;
      'value'?: Array<string>;
    }
  }
}


declare global {

  namespace StencilComponents {
    interface BearerForm {
      'clearOnInput': boolean;
      'fields': FieldSet;
      'updateFieldSet': (fields: FieldSet) => void;
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
      'clearOnInput'?: boolean;
      'fields'?: FieldSet;
      'onSubmit'?: (event: CustomEvent) => void;
    }
  }
}


declare global {

  namespace StencilComponents {
    interface BearerInput {
      'controlName': string;
      'disabled': boolean;
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
      'disabled'?: boolean;
      'hint'?: string;
      'label'?: string;
      'onInputClick'?: (event: CustomEvent) => void;
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
    interface BearerRadio {
      'buttons': Array<{ label: string; value: string; checked?: boolean }>;
      'controlName': string;
      'inline': boolean;
      'label': string;
      'value': string;
    }
  }

  interface HTMLBearerRadioElement extends StencilComponents.BearerRadio, HTMLStencilElement {}

  var HTMLBearerRadioElement: {
    prototype: HTMLBearerRadioElement;
    new (): HTMLBearerRadioElement;
  };
  interface HTMLElementTagNameMap {
    'bearer-radio': HTMLBearerRadioElement;
  }
  interface ElementTagNameMap {
    'bearer-radio': HTMLBearerRadioElement;
  }
  namespace JSX {
    interface IntrinsicElements {
      'bearer-radio': JSXElements.BearerRadioAttributes;
    }
  }
  namespace JSXElements {
    export interface BearerRadioAttributes extends HTMLAttributes {
      'buttons'?: Array<{ label: string; value: string; checked?: boolean }>;
      'controlName'?: string;
      'inline'?: boolean;
      'label'?: string;
      'onValueChange'?: (event: CustomEvent) => void;
      'value'?: string;
    }
  }
}


declare global {

  namespace StencilComponents {
    interface BearerSelect {
      'controlName': string;
      'label': string;
      'options': Array<{ label: string; value: string; default?: boolean }>;
      'value': string;
    }
  }

  interface HTMLBearerSelectElement extends StencilComponents.BearerSelect, HTMLStencilElement {}

  var HTMLBearerSelectElement: {
    prototype: HTMLBearerSelectElement;
    new (): HTMLBearerSelectElement;
  };
  interface HTMLElementTagNameMap {
    'bearer-select': HTMLBearerSelectElement;
  }
  interface ElementTagNameMap {
    'bearer-select': HTMLBearerSelectElement;
  }
  namespace JSX {
    interface IntrinsicElements {
      'bearer-select': JSXElements.BearerSelectAttributes;
    }
  }
  namespace JSXElements {
    export interface BearerSelectAttributes extends HTMLAttributes {
      'controlName'?: string;
      'label'?: string;
      'onValueChange'?: (event: CustomEvent) => void;
      'options'?: Array<{ label: string; value: string; default?: boolean }>;
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
      'btnProps': JSXElements.BearerButtonAttributes;
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
      'btnProps'?: JSXElements.BearerButtonAttributes;
      'direction'?: string;
      'header'?: string;
      'opened'?: boolean;
    }
  }
}


declare global {

  namespace StencilComponents {
    interface BearerConfigDisplay {
      'scenarioId': string;
    }
  }

  interface HTMLBearerConfigDisplayElement extends StencilComponents.BearerConfigDisplay, HTMLStencilElement {}

  var HTMLBearerConfigDisplayElement: {
    prototype: HTMLBearerConfigDisplayElement;
    new (): HTMLBearerConfigDisplayElement;
  };
  interface HTMLElementTagNameMap {
    'bearer-config-display': HTMLBearerConfigDisplayElement;
  }
  interface ElementTagNameMap {
    'bearer-config-display': HTMLBearerConfigDisplayElement;
  }
  namespace JSX {
    interface IntrinsicElements {
      'bearer-config-display': JSXElements.BearerConfigDisplayAttributes;
    }
  }
  namespace JSXElements {
    export interface BearerConfigDisplayAttributes extends HTMLAttributes {
      'scenarioId'?: string;
    }
  }
}


declare global {

  namespace StencilComponents {
    interface BearerConfig {
      'fields': Array<any> | string;
      'referenceId': string;
      'scenarioId': string;
    }
  }

  interface HTMLBearerConfigElement extends StencilComponents.BearerConfig, HTMLStencilElement {}

  var HTMLBearerConfigElement: {
    prototype: HTMLBearerConfigElement;
    new (): HTMLBearerConfigElement;
  };
  interface HTMLElementTagNameMap {
    'bearer-config': HTMLBearerConfigElement;
  }
  interface ElementTagNameMap {
    'bearer-config': HTMLBearerConfigElement;
  }
  namespace JSX {
    interface IntrinsicElements {
      'bearer-config': JSXElements.BearerConfigAttributes;
    }
  }
  namespace JSXElements {
    export interface BearerConfigAttributes extends HTMLAttributes {
      'fields'?: Array<any> | string;
      'onStepCompleted'?: (event: CustomEvent) => void;
      'referenceId'?: string;
      'scenarioId'?: string;
    }
  }
}


declare global {

  namespace StencilComponents {
    interface BearerDropdownButton {
      'btnProps': JSXElements.BearerButtonAttributes;
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
      'btnProps'?: JSXElements.BearerButtonAttributes;
      'innerListener'?: string;
      'opened'?: boolean;
    }
  }
}


declare global {

  namespace StencilComponents {
    interface BearerNavigatorAuthScreen {
      'getTitle': () => string;
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
      'displayMemberProp': string;
      'renderFunc': TMemberRenderer<TMember>;
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
      'displayMemberProp'?: string;
      'onCompleteScreen'?: (event: CustomEvent) => void;
      'renderFunc'?: TMemberRenderer<TMember>;
    }
  }
}


declare global {

  namespace StencilComponents {
    interface BearerNavigatorScreen {
      'getTitle': () => string;
      'name': string;
      'navigationTitle': ((data: any) => string) | string;
      'renderFunc': <T>(
    params: {
      next: (data: any) => void
      prev: () => void
      complete: () => void
      data: T
    }
  ) => void;
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
      'navigationTitle'?: ((data: any) => string) | string;
      'onNavigatorGoBack'?: (event: CustomEvent) => void;
      'onScenarioCompleted'?: (event: CustomEvent) => void;
      'onStepCompleted'?: (event: CustomEvent) => void;
      'renderFunc'?: <T>(
    params: {
      next: (data: any) => void
      prev: () => void
      complete: () => void
      data: T
    }
  ) => void;
    }
  }
}


declare global {

  namespace StencilComponents {
    interface BearerNavigator {
      'btnProps': JSXElements.BearerButtonAttributes;
      'direction': string;
      'display': string;
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
      'btnProps'?: JSXElements.BearerButtonAttributes;
      'direction'?: string;
      'display'?: string;
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
    interface BearerScrollable {
      'fetcher': ({ page: number }) => Promise<{ items: Array<any> }>;
      'perPage': number;
      'renderCollection': TCollectionRenderer;
      'renderFetching': () => any;
      'rendererProps': JSXElements.BearerNavigatorCollectionAttributes;
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
      'renderCollection'?: TCollectionRenderer;
      'renderFetching'?: () => any;
      'rendererProps'?: JSXElements.BearerNavigatorCollectionAttributes;
    }
  }
}


declare global {

  namespace StencilComponents {
    interface BearerSetupDisplay {
      'scenarioId': string;
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
      'scenarioId'?: string;
    }
  }
}


declare global {

  namespace StencilComponents {
    interface BearerSetup {
      'fields': Array<any> | string;
      'referenceId': string;
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
      'fields'?: Array<any> | string;
      'onSetupSuccess'?: (event: CustomEvent) => void;
      'referenceId'?: string;
      'scenarioId'?: string;
    }
  }
}

declare global { namespace JSX { interface StencilJSX {} } }

export declare function defineCustomElements(window: any): void;