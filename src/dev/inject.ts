import { createDecorator } from "vue-class-component";


export default function Inject(service: string = ""): any {

    //console.log('arguments:', arguments)
    return createDecorator((options: any, key: any) => {

        options.dependencies = options.dependencies ? options.dependencies : {};

        if(! service){
            service = key;
        }

        options.dependencies[key] = service;

    })
}