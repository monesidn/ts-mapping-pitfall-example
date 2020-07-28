// Import stylesheets
import './style.css';

function execAndCatch(fn: Function){
  try{
    const result = fn();
    console.info("Execution completed, result:", result);
  }
  catch(ex) {
    console.info("Execution failed, exception:", ex);
  }
}

class AuxObject {
  value: number;

  toString() {
    return '' + this.value;
  }
}

class MyObject {
  prop1: string;
  prop2: number;
  
  prop3: AuxObject;

  concat() {
    return `${this.prop1} ${this.prop2} ${this.prop3}`;
  }
}

const src = JSON.parse(`{
  "prop1": "Hello",
  "prop2": 1,
  "prop3": {
    "value" : 5
  }
}`);

const casted = src as MyObject;
const partiallyMapped = Object.assign(new MyObject(), src);
const fullyMapped = Object.assign(new MyObject(), src, {
  prop3: Object.assign(new AuxObject(), src.prop3)
});

console.info("Calling concat on the casted object.");
execAndCatch(() => casted.concat());

console.info("Calling concat on the partially mapped object.");
execAndCatch(() => partiallyMapped.concat());

console.info("Calling concat on the fully mapped object.");
execAndCatch(() => fullyMapped.concat());