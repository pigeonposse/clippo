export type ChildProcessExecuteParams = {
    cmd: string, 
    onError?: ( error: Error ) => void, 
    onLog?: ( data: string ) => void
}
