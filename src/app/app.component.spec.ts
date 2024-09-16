import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing'; // For routing-related setup
import { AppComponent } from './app.component';
import { CoreModule } from './core';
import { SharedModule } from './shared/shared.module';
import { MainModule } from './components/main.module';

describe('AppComponent', () => {
  let fixture: ComponentFixture<AppComponent>;
  let component: AppComponent;
  beforeEach(async () => {
    // Configure the test bed with the same modules used in AppModule
    await TestBed.configureTestingModule({
      declarations: [AppComponent], // Declare AppComponent
      imports: [
        RouterTestingModule, // Mock routing to avoid full routing setup
        CoreModule, // Import necessary modules
        SharedModule,
        MainModule,
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(AppComponent); // Create fixture
    component = fixture.componentInstance; // Get component instance
  });

  // Basic test: Check if the app component is created
  it('should create the app', () => {
    expect(component).toBeTruthy();
  });

  it(`should have the 'testt' title`, () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app.title).toEqual('testt');
  });

  it('should render title', () => {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('h1')?.textContent).toContain('Hello, testt');
  });
});
