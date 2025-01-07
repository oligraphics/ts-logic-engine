import { IActionInstance } from '../interfaces/action-instance.interface';
import { ICreateActionContext } from '../interfaces/create-action-context.interface';
export declare const ActionBuilderService: {
    build(context: ICreateActionContext, properties: {
        [key: string]: unknown;
    }, variables: {
        [key: string]: unknown;
    }): IActionInstance;
};
//# sourceMappingURL=action-builder.service.d.ts.map