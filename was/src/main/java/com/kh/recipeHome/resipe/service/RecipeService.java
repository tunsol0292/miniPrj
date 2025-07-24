package com.kh.recipeHome.resipe.service;

import com.kh.recipeHome.resipe.mapper.RecipeMapper;
import com.kh.recipeHome.resipe.vo.RecipeVo;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@RequiredArgsConstructor
@Transactional
public class RecipeService {

    private final RecipeMapper recipeMapper;

    public int insert(RecipeVo recipeVo) {
        return recipeMapper.insert(recipeVo);
    }

    public List<RecipeVo> selectList() {
        return recipeMapper.selectList();
    }

    public RecipeVo selectOne(int no) {
        return recipeMapper.selectOne(no);
    }

    public int update(RecipeVo recipeVo) {
        return recipeMapper.update(recipeVo);
    }

    public int delete(int no) {
        return recipeMapper.delete(no);
    }
}
