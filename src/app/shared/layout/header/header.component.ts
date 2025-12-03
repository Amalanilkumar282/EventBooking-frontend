import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../../core/services/auth.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {
  private readonly authService = inject(AuthService);
  private readonly router = inject(Router);

  currentUser = this.authService.currentUser$;
  showUserMenu = signal(false);

  // Provide a callable function that also exposes an `emit()` method.
  // This keeps compatibility with older compiled bundles that call `toggleMobileSidebar.emit()`
  // while allowing templates to call `toggleMobileSidebar()` directly.
  toggleMobileSidebar: any = null;

  constructor() {
    // initialize toggleMobileSidebar as a function and attach an `emit` alias
    this.toggleMobileSidebar = () => {
      try {
        document.body.classList.toggle('sidebar-open');
      } catch (e) {
        // safe fallback for server-side rendering or tests
      }
    };
    // alias emit to the same function for backwards compatibility
    (this.toggleMobileSidebar as any).emit = this.toggleMobileSidebar;
  }

  toggleUserMenu(): void {
    this.showUserMenu.set(!this.showUserMenu());
  }

  logout(): void {
    this.authService.logout();
    this.router.navigate(['/auth/login']);
  }
}
