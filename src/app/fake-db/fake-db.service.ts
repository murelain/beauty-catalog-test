import { InMemoryDbService } from 'angular-in-memory-web-api';
import { ProductsDB } from './products';


export class FakeDbService implements InMemoryDbService
{
    createDb()
    {
        return {
            // Products List
            'products': ProductsDB.products,
        };
    }
}
