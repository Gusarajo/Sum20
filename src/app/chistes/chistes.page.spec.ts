import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ChistesPage } from './chistes.page';

describe('ChistesPage', () => {
  let component: ChistesPage;
  let fixture: ComponentFixture<ChistesPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(ChistesPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
