import { Model } from 'mongoose';

export type MongooseSaved<T> = Awaited<ReturnType<InstanceType<Model<T>>['save']>>;
