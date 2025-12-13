export interface IApiError<D = string> {
	code: string;
	data: D;
}
