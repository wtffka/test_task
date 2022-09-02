package com.example.test_task.service.impl;

import com.example.test_task.dto.PhoneBookDto;
import com.example.test_task.model.PhoneBook;
import com.example.test_task.repository.PhoneBookRepository;
import com.example.test_task.service.PhoneBookService;
import org.springframework.stereotype.Service;

import java.util.Date;
import java.util.List;
import java.util.NoSuchElementException;

@Service
public class PhoneBookServiceImpl implements PhoneBookService {

    private final PhoneBookRepository phoneBookRepository;

    public PhoneBookServiceImpl(PhoneBookRepository phoneBookRepository) {
        this.phoneBookRepository = phoneBookRepository;
    }

    @Override
    public PhoneBook getRecordById(Long id) {
        return phoneBookRepository.findById(id).orElseThrow(NoSuchElementException::new);
    }

    @Override
    public PhoneBook createNewRecord(PhoneBookDto phoneBookDto) {
        PhoneBook recordToCreate = new PhoneBook();
        return fromPhoneBookDto(recordToCreate, phoneBookDto);
    }

    @Override
    public PhoneBook updateRecord(Long id, PhoneBookDto phoneBookDto) {
        PhoneBook recordToUpdate = phoneBookRepository.findById(id).orElseThrow(NoSuchElementException::new);
        return fromPhoneBookDto(recordToUpdate, phoneBookDto);
    }

    @Override
    public List<PhoneBook> updateRecords() {
        List<PhoneBook> records = phoneBookRepository.findAll();
        return updateInfo(records);
    }

    private PhoneBook fromPhoneBookDto(PhoneBook recordToDo, PhoneBookDto phoneBookDto) {
        if (phoneBookDto.getCustomerName() != null) recordToDo.setCustomerName(phoneBookDto.getCustomerName());
        if (phoneBookDto.getPhoneNumber() != null) recordToDo.setPhoneNumber(phoneBookDto.getPhoneNumber());
        return phoneBookRepository.save(recordToDo);
    }

    private List<PhoneBook> updateInfo(List<PhoneBook> records) {
        if (records.get(0).getPhoneNumber().startsWith("+")) {
            for (PhoneBook record : records) {
                record.setPhoneNumber(record.getPhoneNumber().replace("+7", "8"));
            }
        } else {
            for (PhoneBook record : records) {
                String updatedNumber = "+7";
                record.setPhoneNumber(updatedNumber + record.getPhoneNumber().substring(1));
            }
        }
        return phoneBookRepository.saveAll(records);
    }

}
