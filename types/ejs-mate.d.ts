declare module 'ejs-mate' {
  import { Engine } from 'ejs';
  
  interface EjsMateOptions {
    cache?: boolean;
    filename?: string;
    root?: string;
    views?: string[];
    layout?: string;
    [key: string]: any;
  }

  function ejsMate(options?: EjsMateOptions): Engine;
  export = ejsMate;
}
