import Component from 'vue-class-component';
import Vue from 'vue';
export function Page(page: any,options: any = null): any{

    console.log('page: ',page)
    console.log('options: ',options)

    return function(...args: any[]){
        console.log('args: ',args)
    }
}

export default Page;