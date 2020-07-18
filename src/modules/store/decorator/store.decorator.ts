import { SetMetadata } from '@nestjs/common';

export const Store = (...store: string[]) => SetMetadata('store', store);
