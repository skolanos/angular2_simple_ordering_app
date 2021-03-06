import { Injectable } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';

import { AuthenticationService } from './authentication.service';

@Injectable()
export class CartService {
	private numberOfItems: number;

	constructor(
		private http: Http,
		private authenticationService: AuthenticationService
	) {
		this.numberOfItems = 0;
	}
	getCount(): number {
		return this.numberOfItems;
	}
	getNumberOfItems(): Observable<any> {
		return this.http.post('/api/cart-number-of-items', '', {
			headers: new Headers({
				'Content-Type': 'application/json',
				'x-access-token': this.authenticationService.getUserToken()
			})
		}).map((response: Response) => {
			let value = response.json();
			if (value.status === 200) {
				this.numberOfItems = parseInt(value.data[0].rowsCount, 10);
			}

			return value;
		});
	}
	getItemsList(): Observable<any> {
		return this.http.post('/api/cart-items-list', JSON.stringify({
		}), {
			headers: new Headers({
				'Content-Type': 'application/json',
				'x-access-token': this.authenticationService.getUserToken()
			})
		}).map((response: Response) => response.json());
	}
	deleteItem(cartId: number): Observable<any> {
		return this.http.post('/api/cart-delete-item', JSON.stringify({
			cartId: cartId
		}), {
			headers: new Headers({
				'Content-Type': 'application/json',
				'x-access-token': this.authenticationService.getUserToken()
			})
		}).map((response: Response) => response.json());
	}
	deleteAll(): Observable<any> {
		return this.http.post('/api/cart-delete-all-items', '', {
			headers: new Headers({
				'Content-Type': 'application/json',
				'x-access-token': this.authenticationService.getUserToken()
			})
		}).map((response: Response) => response.json());
	}
	registerOrder(): Observable<any> {
		return this.http.post('/api/orders-register-new', '', {
			headers: new Headers({
				'Content-Type': 'application/json',
				'x-access-token': this.authenticationService.getUserToken()
			})
		}).map((response: Response) => response.json());
	}
}
