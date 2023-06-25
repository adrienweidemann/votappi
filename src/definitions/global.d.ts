export type FastifyPluginDoneFunction = (err?: Error) => void;

export interface FindAndCountAllType<T> {
  data: T[];
  count: number;
}
