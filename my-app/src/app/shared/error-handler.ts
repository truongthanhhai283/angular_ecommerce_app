import { HttpErrorResponse } from '@angular/common/http';

export class ErrorHandler {
  handleError(errorResponse: HttpErrorResponse) {
    if (errorResponse.error instanceof ErrorEvent) {
      console.error('Client Side Error: ' + errorResponse.error.message);
      console.error('Server Side Error: ' + errorResponse);
    } else {
      return alert(
        'Please refresh the website again, maybe there are problem with the server !!!'
      );
    }
  }
}