import { TestBed } from '@angular/core/testing';
import { TripPlannerService } from './trip-planner.service';

describe('TripPlannerService', () => {
  let service: TripPlannerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TripPlannerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should calculate date ranges and days count correctly', () => {
    service.setStartDate('2026-09-01');
    service.setEndDate('2026-09-05');
    expect(service.daysCount()).toBe(5);
    expect(service.dateRangeFormatted()).toContain('01 - 05 Eylül 2026');
  });

  it('should find places by id or fallback dynamically', () => {
    const place = service.findPlaceById('sch-rome-101');
    expect(place).toBeTruthy();
    expect(place.name).toBeDefined();
  });
});
