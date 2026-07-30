import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HeaderComponent } from './header.component';

describe('HeaderComponent', () => {
  let component: HeaderComponent;
  let fixture: ComponentFixture<HeaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HeaderComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(HeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render the trust bar', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('.trust-bar')).toBeTruthy();
  });

  it('should render the site header', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('.site-header')).toBeTruthy();
  });
});
