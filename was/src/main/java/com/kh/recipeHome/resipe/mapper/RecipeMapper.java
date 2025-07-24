package com.kh.recipeHome.resipe.mapper;

import com.kh.recipeHome.resipe.vo.RecipeVo;
import org.apache.ibatis.annotations.Insert;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Select;
import org.apache.ibatis.annotations.Update;

import java.util.List;

@Mapper
public interface RecipeMapper {

    @Insert("""
            INSERT INTO RECIPE (
                NO, TITLE, CONTENT, CATEGORY_NO, CREATE_AT, MODIFIED_AT, DEL_YN
            ) VALUES (
                SEQ_RECIPE.NEXTVAL, #{title}, #{content}, #{categoryNo}, SYSDATE, SYSDATE, 'N'
            )
            """)
    int insert(RecipeVo recipeVo);

    @Select("""
        SELECT R.NO, R.TITLE, R.CONTENT, R.CATEGORY_NO, C.CATEGORY_NAME
        FROM RECIPE R
        JOIN RECIPE_CATEGORY C ON R.CATEGORY_NO = C.CATEGORY_NO
        WHERE R.DEL_YN = 'N'
        ORDER BY R.NO DESC
        """)
    List<RecipeVo> selectList();

    @Select("""
            SELECT R.NO, R.TITLE, R.CONTENT, R.CATEGORY_NO, C.CATEGORY_NAME, R.CREATE_AT, R.MODIFIED_AT
            FROM RECIPE R
            JOIN RECIPE_CATEGORY C ON R.CATEGORY_NO = C.CATEGORY_NO
            WHERE R.NO = #{no} AND R.DEL_YN = 'N'
            """)
    RecipeVo selectOne(int no);

    @Update("""
            UPDATE RECIPE
            SET TITLE = #{title},
                CONTENT = #{content},
                CATEGORY_NO = #{categoryNo},
                MODIFIED_AT = SYSDATE
            WHERE NO = #{no} AND DEL_YN = 'N'
            """)
    int update(RecipeVo recipeVo);

    @Update("""
            UPDATE RECIPE
            SET DEL_YN = 'Y'
            WHERE NO = #{no}
            """)
    int delete(int no);
}