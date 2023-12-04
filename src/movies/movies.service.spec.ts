import { Test, TestingModule } from '@nestjs/testing';

import { MoviesService } from './movies.service';
import { NotFoundException } from '@nestjs/common';

describe('MoviesService', () => {
  let service: MoviesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MoviesService],
    }).compile();

    service = module.get<MoviesService>(MoviesService);
    service.create({
      title: 'Test Movie',
      year: 2020,
      genres: ['test'],
    });
  });

  it('영화 서비스 정의 확인', () => {
    expect(service).toBeDefined();
  });

  describe('영화 생성', () => {
    it('should create a movie', () => {
      const beforeCreate = service.getAll().length;
      service.create({
        title: 'Test Movie2',
        year: 2022,
        genres: ['test2'],
      });
      const afterCreate = service.getAll().length;
      expect(afterCreate).toBeGreaterThan(beforeCreate);
    });
  });

  describe('영화 목록 받아오기', () => {
    it('영화 전체 목록', () => {
      const result = service.getAll();
      expect(result).toBeInstanceOf(Array);
    });

    it('영화 일부 목록', () => {
      const movie = service.getOne(1);
      expect(movie).toBeDefined();
      expect(movie.id).toEqual(1);
    });

    it('해당 영화 정보가 없을 경우 에러 테스트', () => {
      try {
        service.getOne(999);
      } catch (e) {
        expect(e).toBeInstanceOf(NotFoundException);
      }
    });
  });

  describe('영화 정보 업데이트', () => {
    it('하나의 영화 정보 업데이트', () => {
      service.update(1, {
        title: 'Update Test',
      });

      const movie = service.getOne(1);
      expect(movie.title).toEqual('Update Test');
    });

    it('해당 영화 정보가 없을 경우 에러 테스트', () => {
      try {
        service.update(999, {});
      } catch (e) {
        expect(e).toBeInstanceOf(NotFoundException);
      }
    });
  });

  describe('영화 정보 삭제하기', () => {
    it('원하는 영화 정보 삭제', () => {
      const beforeDelete = service.getAll().length;
      service.deleteOne(1);

      const afterDelete = service.getAll().length;
      expect(afterDelete).toBeLessThan(beforeDelete);
    });

    it('해당 영화 정보가 없을 경우 에러 테스트', () => {
      try {
        service.deleteOne(999);
      } catch (e) {
        expect(e).toBeInstanceOf(NotFoundException);
      }
    });
  });
});
