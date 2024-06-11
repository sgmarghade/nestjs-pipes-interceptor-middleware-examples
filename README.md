* This is example repo for 
  * Exception Filters
    * Declare it under app module as `APP_FILTER`. 
    * Implements `ExceptionFilter`
    * You can modify response
  * Guards
    * Can be declared in app module `APP_GUARDS` or use directly in controllers as `@UseGuards()`
    * It returns true or false
    * Implements `CanActivate`
  * Interceptors
    * Can be declared in App module as `APP_INTERCEPTOR` or directly use it in controller as `@UseInterceptors()`
    * Can intercept request and response as well after `handle()` call. handle() call is must.
    * Implements `NestInterceptor`
    * Not invoked if exception is thrown from controller unless used catch() in chain.
  * Pipes
    * Can be declared in app module as APP_PIPES or directly use in controller.
    * Implements `PipeTransform`
* If you want to inject anything in controller make sure to declare it in `app module`.
* Order of execution
  * Middlewares -> Guards -> Interceptors -> Pipes -> Controller -> Interceptor / ExceptionFilter
* ![](https://i.sstatic.net/2lFhd.jpg)

