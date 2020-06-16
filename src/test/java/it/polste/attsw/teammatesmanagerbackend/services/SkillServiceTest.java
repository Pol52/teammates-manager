package it.polste.attsw.teammatesmanagerbackend.services;

import it.polste.attsw.teammatesmanagerbackend.repositories.SkillRepository;
import it.polste.attsw.teammatesmanagerbackend.models.Skill;

import java.util.List;
import static java.util.Arrays.asList;

import org.junit.Test;
import org.junit.runner.RunWith;
import static org.mockito.Mockito.*;
import org.mockito.InOrder;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.MockitoJUnitRunner;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import static org.assertj.core.api.Assertions.assertThat;


@RunWith(MockitoJUnitRunner.class)
public class SkillServiceTest {

    private static final Logger logger = LoggerFactory.getLogger(SkillServiceTest.class);

    @Mock
    private SkillRepository skillRepository;

    @InjectMocks
    private SkillService skillService;

    @Test
    public void getAllSkillsTest(){
        Skill skill1 = new Skill(1L, "skill1");
        Skill skill2 = new Skill(2L, "skill2");

        when(skillRepository.findAll())
                .thenReturn(asList(skill1, skill2));
        List<Skill> result = skillService.getAllSkills();

        assertThat(result).containsExactly(skill1, skill2);

        logger.info("Retrieved all skills: " + result.size() + " skills");
    }

    @Test
    public void insertNewSkillAndReturnSavedSkillWithIdTest(){
        Skill saved = new Skill(1L, "skill");
        Skill toSave = spy(new Skill(999L, ""));

        when(skillRepository.save(any(Skill.class)))
                .thenReturn(saved);
        Skill result = skillService.insertNewSkill(toSave);

        assertThat(result).isSameAs(saved);
        logger.info("Inserted new skill with name: " + saved.getName());

        InOrder inOrder = inOrder(toSave, skillRepository);
        inOrder.verify(toSave).setId(null);
        inOrder.verify(skillRepository).save(toSave);
    }

    @Test
    public void insertExistingSkillAndReturnPreviouslySavedSkillTest(){
        Skill toSave = new Skill(999L, "Skill1");
        Skill saved1 = new Skill(1L, "skill1");
        Skill saved2 = new Skill(2L, "skill2");

        when(skillRepository.findAll())
                .thenReturn(asList(saved2, saved1));

        Skill result = skillService.insertNewSkill(toSave);
        assertThat(result).isSameAs(saved1);
        logger.info("Returned existing skill: " + saved1.getName());
    }


}
