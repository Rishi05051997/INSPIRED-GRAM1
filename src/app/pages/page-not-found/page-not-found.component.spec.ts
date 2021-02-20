import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PageNotFOundComponent } from './page-not-found.component';

describe('PageNotFOundComponent', () => {
  let component: PageNotFOundComponent;
  let fixture: ComponentFixture<PageNotFOundComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PageNotFOundComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PageNotFOundComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
