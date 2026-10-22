import { HttpClient } from '@angular/common/http';
import { inject, Service } from '@angular/core';
import { environment } from '../../environments/environment';
import { firstValueFrom } from 'rxjs';

@Service()
export class ApiService {
  private readonly http = inject(HttpClient);

  public get<T>(url: string): Promise<T> {
    return this.makeRequest('get', url);
  }

  public post<T>(url: string, body: unknown): Promise<T> {
    return this.makeRequest('post', url, body);
  }

  public put<T>(url: string, body: unknown): Promise<T> {
    return this.makeRequest('put', url, body);
  }

  public patch<T>(url: string, body: unknown): Promise<T> {
    return this.makeRequest('patch', url, body);
  }

  public delete<T>(url: string): Promise<T> {
    return this.makeRequest('delete', url);
  }

  private async makeRequest<T>(
    method: 'get' | 'post' | 'put' | 'patch' | 'delete',
    url: string,
    body?: unknown,
  ): Promise<T> {
    const fullUrl = environment.apiUrl + url;
    let observable;

    switch (method) {
      case 'get':
        observable = this.http.get<T>(fullUrl);
        break;
      case 'post':
        observable = this.http.post<T>(fullUrl, body);
        break;
      case 'put':
        observable = this.http.put<T>(fullUrl, body);
        break;
      case 'patch':
        observable = this.http.patch<T>(fullUrl, body);
        break;
      case 'delete':
        observable = this.http.delete<T>(fullUrl);
        break;
      default:
        throw new Error(`Unsupported method: ${method}`);
        break;
    }

    try {
      return await firstValueFrom(observable);
    } catch (error) {
      throw error;
    }
  }
}
