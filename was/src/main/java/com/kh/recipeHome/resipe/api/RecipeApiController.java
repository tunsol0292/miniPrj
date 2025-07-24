package com.kh.recipeHome.resipe.api;

import com.kh.recipeHome.resipe.service.RecipeService;
import com.kh.recipeHome.resipe.vo.RecipeVo;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/recipe")
@RequiredArgsConstructor
@CrossOrigin(origins = "http://127.0.0.1:5501")
public class RecipeApiController {

    private final RecipeService recipeService;

    @PostMapping
    public ResponseEntity<Integer> insert(@RequestBody RecipeVo recipeVo) {
        int result = recipeService.insert(recipeVo);
        return ResponseEntity.ok().body(result);
    }

    @GetMapping
    public ResponseEntity<List<RecipeVo>> list() {
        List<RecipeVo> list = recipeService.selectList();
        return ResponseEntity.ok(list);
    }

    @GetMapping("{no}")
    public ResponseEntity<RecipeVo> detail(@PathVariable int no) {
        RecipeVo vo = recipeService.selectOne(no);
        return ResponseEntity.ok(vo);
    }

    @PutMapping
    public ResponseEntity<Integer> update(@RequestBody RecipeVo recipeVo) {
        int result = recipeService.update(recipeVo);
        return ResponseEntity.ok(result);
    }

    @DeleteMapping("{no}")
    public ResponseEntity<Integer> delete(@PathVariable int no) {
        int result = recipeService.delete(no);
        return ResponseEntity.ok(result);
    }
}
