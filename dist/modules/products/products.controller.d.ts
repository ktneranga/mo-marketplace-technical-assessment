import { ProductService } from './product.service';
import { CreateProductDto } from './create-product.dto';
import { QueryProductDto } from './query-product.dto';
export declare class ProductsController {
    private readonly productService;
    constructor(productService: ProductService);
    create(dto: CreateProductDto): Promise<import("./product.entity").Product>;
    findAll(query: QueryProductDto): Promise<{
        data: import("./product.entity").Product[];
        meta: {
            total: number;
            page: number;
            limit: number;
            totalPages: number;
        };
    }>;
}
