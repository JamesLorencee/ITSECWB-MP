import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PageSchemaComponent } from './page-schema.component';

describe('PageSchemaComponent', () => {
  let component: PageSchemaComponent;
  let fixture: ComponentFixture<PageSchemaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PageSchemaComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PageSchemaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
