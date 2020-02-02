import { createDecorator } from 'vue-class-component';
import gql from 'graphql-tag'

export interface QueryOptions{
    query: any;
    update: Function;
    variables: { [i:string]: any} | Function;
    throttle: number;
    debounce: number;
    pullInterval: number;
    result: Function;
    error: Function;
    deep: boolean;
}

export function Query(queryOptions: QueryOptions | any, name: string = ''){

    
    if( typeof queryOptions == 'object'){

            if( typeof queryOptions.query == 'string'){
                
                queryOptions.query = gql(queryOptions.query);
            }
    }

    return createDecorator( (options:any, key: string) => {

            if(! name){
                name = key;
            }

            options.apollo = options.apollo || {};

            options.apollo[name] = queryOptions;
    })
}


export default Query;