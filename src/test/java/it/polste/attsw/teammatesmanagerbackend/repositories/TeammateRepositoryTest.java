package it.polste.attsw.teammatesmanagerbackend.repositories;

import it.polste.attsw.teammatesmanagerbackend.models.PersonalData;
import it.polste.attsw.teammatesmanagerbackend.models.Teammate;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;
import org.springframework.test.context.junit4.SpringRunner;

import java.util.List;

import static org.assertj.core.api.Assertions.assertThat;

@DataJpaTest
@RunWith(SpringRunner.class)
public class TeammateRepositoryTest {

  @Autowired
  private TeammateRepository teammateRepository;

  public void saveAndReadRecordWithRepository() {
    PersonalData personalData = new PersonalData("Stefano Vannucchi",
            "stefano.vannucchi@stud.unifi.it",
            "M",
            "Prato",
            "student",
            "https://semantic-ui.com/images/avatar/large/steve.jpg");

    Teammate teammate = new Teammate(null, personalData);
    Teammate persistedTeammate = teammateRepository.save(teammate);
    List<Teammate> teammates = teammateRepository.findAll();
    assertThat(teammates).containsExactly(persistedTeammate);
  }
}
