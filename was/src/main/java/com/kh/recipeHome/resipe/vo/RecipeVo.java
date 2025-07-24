package com.kh.recipeHome.resipe.vo;

import lombok.Data;

@Data
public class RecipeVo {

    private int no;
    private String title;
    private String content;
    private int categoryNo;
    private String categoryName;
    private String createAt;
    private String modifiedAt;

}
