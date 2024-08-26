import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private isAuthenticated = false;
  private userRoles: string[] = [];
  constructor(private router: Router) {
    if (this.isBrowser()) {
      this.loadSession();
    }
  }

  private isBrowser(): boolean {
    return typeof window !== 'undefined' && typeof localStorage !== 'undefined';
  }

  private loadSession(): void {
    const token = localStorage.getItem('token');
    const roles = localStorage.getItem('roles');
    if (token && roles) {
      this.isAuthenticated = true;
      this.userRoles = JSON.parse(roles);
    }
  }

  login(roles: string[]): void {
    if (this.isBrowser()) {
      this.isAuthenticated = true;
      this.userRoles = roles;
      localStorage.setItem('roles', JSON.stringify(roles));
    }
  }

  logout(): void {
    if (this.isBrowser()) {
      localStorage.removeItem('token');
      localStorage.removeItem('roles');
    }
    this.isAuthenticated = false;
    this.userRoles = [];
    this.router.navigate(['/login']);
  }

  getIsAuthenticated(): boolean {
    return this.isAuthenticated;
  }

  getUserRoles(): string[] {
    return this.userRoles;
  }

  checkUserRole(role: string): boolean {
    return this.userRoles.includes(role);
  }

  isAdmin(): boolean {
    return this.checkUserRole('Admin');
  }

  isUser(): boolean {
    return this.checkUserRole('User');
  }
  getMainPageForUser() {
    return this.isAdmin() ? '/admin' : '/page';
  }
}
